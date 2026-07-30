package com.vithub.backend.canteen.queue.service.impl;

import com.vithub.backend.canteen.entity.Canteen;
import com.vithub.backend.canteen.queue.dto.CanteenQueueCountUpdateRequest;
import com.vithub.backend.canteen.queue.dto.CanteenQueueRequest;
import com.vithub.backend.canteen.queue.dto.CanteenQueueResponse;
import com.vithub.backend.canteen.queue.dto.CanteenQueueWaitTimeUpdateRequest;
import com.vithub.backend.canteen.queue.entity.CanteenQueue;
import com.vithub.backend.canteen.queue.entity.CanteenQueueStatus;
import com.vithub.backend.canteen.queue.mapper.CanteenQueueMapper;
import com.vithub.backend.canteen.queue.repository.CanteenQueueRepository;
import com.vithub.backend.canteen.queue.service.CanteenQueueService;
import com.vithub.backend.canteen.repository.CanteenRepository;
import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link CanteenQueueService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent canteen is always re-resolved from {@code canteenId} on
 * create/full-update so a queue reading can never reference one that
 * doesn't exist, and the {@link CanteenQueueStatus} crowding tier is
 * derived here from the reported queue count rather than trusted from the
 * caller — mirroring how {@code OccupancyServiceImpl} derives its status
 * from a room's capacity. The dedicated count/wait-time updates use the
 * repository's bulk {@code @Modifying} queries so the high-frequency path
 * (a mock scheduler or live feed reporting a new headcount) never has to
 * load the full entity graph first.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CanteenQueueServiceImpl implements CanteenQueueService {

    /** Queue count below which a canteen is considered LOW. */
    private static final int LOW_THRESHOLD = 5;
    /** Queue count below which a canteen is considered MODERATE (otherwise HIGH). */
    private static final int MODERATE_THRESHOLD = 15;
    /** Queue count at or above which a canteen is considered VERY_HIGH. */
    private static final int VERY_HIGH_THRESHOLD = 30;

    private final CanteenQueueRepository canteenQueueRepository;
    private final CanteenRepository canteenRepository;
    private final CanteenQueueMapper canteenQueueMapper;

    @Override
    @Transactional(readOnly = true)
    public List<CanteenQueueResponse> getAllQueues() {
        return canteenQueueRepository.findAllByOrderByCanteenNameAsc().stream()
                .map(canteenQueueMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CanteenQueueResponse getQueueById(UUID id) {
        return canteenQueueMapper.toResponse(findQueueOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public CanteenQueueResponse getQueueByCanteenId(UUID canteenId) {
        CanteenQueue queue = canteenQueueRepository.findByCanteenId(canteenId)
                .orElseThrow(() -> new ResourceNotFoundException("No queue record found for canteen id: " + canteenId));
        return canteenQueueMapper.toResponse(queue);
    }

    @Override
    @Transactional(readOnly = true)
    public Integer getCurrentQueueSize(UUID canteenId) {
        return canteenQueueRepository.findCurrentQueueSizeByCanteenId(canteenId)
                .orElseThrow(() -> new ResourceNotFoundException("No queue record found for canteen id: " + canteenId));
    }

    @Override
    @Transactional
    public CanteenQueueResponse createQueue(CanteenQueueRequest request) {
        Canteen canteen = findCanteenOrThrow(request.getCanteenId());

        if (canteenQueueRepository.existsByCanteenId(canteen.getId())) {
            throw new ConflictException("A queue record already exists for canteen: " + canteen.getName());
        }

        CanteenQueueStatus status = resolveStatus(request.getQueueCount());
        CanteenQueue queue = canteenQueueMapper.toEntity(
                canteen, request.getQueueCount(), request.getEstimatedWaitMinutes(), status, Instant.now());
        CanteenQueue saved = canteenQueueRepository.save(queue);
        log.info("Created queue record for canteen '{}': {} waiting", canteen.getName(), saved.getQueueCount());
        return canteenQueueMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public CanteenQueueResponse updateQueue(UUID id, CanteenQueueRequest request) {
        CanteenQueue queue = findQueueOrThrow(id);
        Canteen canteen = findCanteenOrThrow(request.getCanteenId());

        if (canteenQueueRepository.existsByCanteenIdAndIdNot(canteen.getId(), id)) {
            throw new ConflictException("A queue record already exists for canteen: " + canteen.getName());
        }

        CanteenQueueStatus status = resolveStatus(request.getQueueCount());
        canteenQueueMapper.updateEntity(
                queue, canteen, request.getQueueCount(), request.getEstimatedWaitMinutes(), status, Instant.now());
        CanteenQueue saved = canteenQueueRepository.save(queue);
        log.info("Updated queue record for canteen '{}': {} waiting", canteen.getName(), saved.getQueueCount());
        return canteenQueueMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public CanteenQueueResponse updateQueueCount(UUID id, CanteenQueueCountUpdateRequest request) {
        CanteenQueue queue = findQueueOrThrow(id);
        CanteenQueueStatus status = resolveStatus(request.getQueueCount());

        canteenQueueRepository.updateQueueCount(id, request.getQueueCount(), status, Instant.now());
        log.info("Updated queue count for canteen '{}': {} waiting", queue.getCanteen().getName(), request.getQueueCount());
        return canteenQueueMapper.toResponse(findQueueOrThrow(id));
    }

    @Override
    @Transactional
    public CanteenQueueResponse updateEstimatedWaitTime(UUID id, CanteenQueueWaitTimeUpdateRequest request) {
        CanteenQueue queue = findQueueOrThrow(id);

        canteenQueueRepository.updateEstimatedWaitMinutes(id, request.getEstimatedWaitMinutes(), Instant.now());
        log.info("Updated estimated wait time for canteen '{}': {} minutes",
                queue.getCanteen().getName(), request.getEstimatedWaitMinutes());
        return canteenQueueMapper.toResponse(findQueueOrThrow(id));
    }

    @Override
    @Transactional
    public void deleteQueue(UUID id) {
        CanteenQueue queue = findQueueOrThrow(id);
        canteenQueueRepository.delete(queue);
        log.info("Deleted queue record for canteen '{}'", queue.getCanteen().getName());
    }

    private CanteenQueue findQueueOrThrow(UUID id) {
        return canteenQueueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Queue record not found with id: " + id));
    }

    private Canteen findCanteenOrThrow(UUID canteenId) {
        return canteenRepository.findById(canteenId)
                .orElseThrow(() -> new ResourceNotFoundException("Canteen not found with id: " + canteenId));
    }

    private CanteenQueueStatus resolveStatus(int queueCount) {
        if (queueCount >= VERY_HIGH_THRESHOLD) {
            return CanteenQueueStatus.VERY_HIGH;
        }
        if (queueCount >= MODERATE_THRESHOLD) {
            return CanteenQueueStatus.HIGH;
        }
        if (queueCount >= LOW_THRESHOLD) {
            return CanteenQueueStatus.MODERATE;
        }
        return CanteenQueueStatus.LOW;
    }

}
