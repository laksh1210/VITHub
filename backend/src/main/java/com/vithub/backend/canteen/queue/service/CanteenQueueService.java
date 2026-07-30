package com.vithub.backend.canteen.queue.service;

import com.vithub.backend.canteen.queue.dto.CanteenQueueCountUpdateRequest;
import com.vithub.backend.canteen.queue.dto.CanteenQueueRequest;
import com.vithub.backend.canteen.queue.dto.CanteenQueueResponse;
import com.vithub.backend.canteen.queue.dto.CanteenQueueWaitTimeUpdateRequest;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Canteen Queue module. Implemented by
 * {@link com.vithub.backend.canteen.queue.service.impl.CanteenQueueServiceImpl}.
 */
public interface CanteenQueueService {

    List<CanteenQueueResponse> getAllQueues();

    CanteenQueueResponse getQueueById(UUID id);

    CanteenQueueResponse getQueueByCanteenId(UUID canteenId);

    Integer getCurrentQueueSize(UUID canteenId);

    CanteenQueueResponse createQueue(CanteenQueueRequest request);

    CanteenQueueResponse updateQueue(UUID id, CanteenQueueRequest request);

    CanteenQueueResponse updateQueueCount(UUID id, CanteenQueueCountUpdateRequest request);

    CanteenQueueResponse updateEstimatedWaitTime(UUID id, CanteenQueueWaitTimeUpdateRequest request);

    void deleteQueue(UUID id);

}
