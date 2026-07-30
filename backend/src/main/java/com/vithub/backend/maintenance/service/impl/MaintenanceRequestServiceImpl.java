package com.vithub.backend.maintenance.service.impl;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.entity.User;
import com.vithub.backend.maintenance.dto.MaintenanceRequestAssignRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestCreateRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestResponse;
import com.vithub.backend.maintenance.dto.MaintenanceRequestStatusUpdateRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestUpdateRequest;
import com.vithub.backend.maintenance.entity.MaintenanceRequest;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.entity.Priority;
import com.vithub.backend.maintenance.mapper.MaintenanceRequestMapper;
import com.vithub.backend.maintenance.repository.MaintenanceRequestRepository;
import com.vithub.backend.maintenance.service.MaintenanceRequestService;
import com.vithub.backend.repository.UserRepository;
import com.vithub.backend.room.entity.Room;
import com.vithub.backend.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link MaintenanceRequestService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * Reporter, assigned staff, building and room references are resolved
 * from their ids here (never trusted blindly) before being handed to the
 * mapper, mirroring how {@code RoomServiceImpl} resolves its parent
 * building.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MaintenanceRequestServiceImpl implements MaintenanceRequestService {

    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final MaintenanceRequestMapper maintenanceRequestMapper;
    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponse> getAllMaintenanceRequests() {
        return maintenanceRequestRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(maintenanceRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MaintenanceRequestResponse getMaintenanceRequestById(UUID id) {
        return maintenanceRequestMapper.toResponse(findMaintenanceRequestOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponse> getMaintenanceRequestsByStatus(MaintenanceStatus status) {
        return maintenanceRequestRepository.findAllByStatusOrderByCreatedAtDesc(status).stream()
                .map(maintenanceRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponse> getMaintenanceRequestsByPriority(Priority priority) {
        return maintenanceRequestRepository.findAllByPriorityOrderByCreatedAtDesc(priority).stream()
                .map(maintenanceRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponse> getMaintenanceRequestsByReporter(UUID reporterId) {
        return maintenanceRequestRepository.findAllByReporterIdOrderByCreatedAtDesc(reporterId).stream()
                .map(maintenanceRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponse> getMaintenanceRequestsByAssignedStaff(UUID assignedStaffId) {
        return maintenanceRequestRepository.findAllByAssignedStaffIdOrderByCreatedAtDesc(assignedStaffId).stream()
                .map(maintenanceRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponse> getMaintenanceRequestsByBuilding(UUID buildingId) {
        return maintenanceRequestRepository.findAllByBuildingIdOrderByCreatedAtDesc(buildingId).stream()
                .map(maintenanceRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponse> getMaintenanceRequestsByRoom(UUID roomId) {
        return maintenanceRequestRepository.findAllByRoomIdOrderByCreatedAtDesc(roomId).stream()
                .map(maintenanceRequestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public MaintenanceRequestResponse createMaintenanceRequest(UUID reporterId, MaintenanceRequestCreateRequest request) {
        User reporter = findUserOrThrow(reporterId, "Reporter");
        Building building = resolveBuilding(request.getBuildingId());
        Room room = resolveRoom(request.getRoomId());

        MaintenanceRequest maintenanceRequest = maintenanceRequestMapper.toEntity(request, reporter, building, room);
        MaintenanceRequest saved = maintenanceRequestRepository.save(maintenanceRequest);
        log.info("Created maintenance request '{}' reported by '{}'", saved.getTitle(), reporter.getUsername());
        return maintenanceRequestMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public MaintenanceRequestResponse updateMaintenanceRequest(UUID id, MaintenanceRequestUpdateRequest request) {
        MaintenanceRequest maintenanceRequest = findMaintenanceRequestOrThrow(id);
        Building building = resolveBuilding(request.getBuildingId());
        Room room = resolveRoom(request.getRoomId());

        maintenanceRequestMapper.updateEntity(maintenanceRequest, request, building, room);
        MaintenanceRequest saved = maintenanceRequestRepository.save(maintenanceRequest);
        log.info("Updated maintenance request '{}' ({})", saved.getTitle(), saved.getId());
        return maintenanceRequestMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public MaintenanceRequestResponse updateMaintenanceRequestStatus(UUID id, MaintenanceRequestStatusUpdateRequest request) {
        MaintenanceRequest maintenanceRequest = findMaintenanceRequestOrThrow(id);
        maintenanceRequest.setStatus(request.getStatus());
        MaintenanceRequest saved = maintenanceRequestRepository.save(maintenanceRequest);
        log.info("Updated maintenance request '{}' status to {}", saved.getId(), saved.getStatus());
        return maintenanceRequestMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public MaintenanceRequestResponse assignMaintenanceRequest(UUID id, MaintenanceRequestAssignRequest request) {
        MaintenanceRequest maintenanceRequest = findMaintenanceRequestOrThrow(id);
        User assignedStaff = request.getAssignedStaffId() != null
                ? findUserOrThrow(request.getAssignedStaffId(), "Assigned staff")
                : null;
        maintenanceRequest.setAssignedStaff(assignedStaff);
        MaintenanceRequest saved = maintenanceRequestRepository.save(maintenanceRequest);
        log.info("Assigned maintenance request '{}' to {}", saved.getId(),
                assignedStaff != null ? assignedStaff.getUsername() : "nobody (unassigned)");
        return maintenanceRequestMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteMaintenanceRequest(UUID id) {
        MaintenanceRequest maintenanceRequest = findMaintenanceRequestOrThrow(id);
        maintenanceRequestRepository.delete(maintenanceRequest);
        log.info("Deleted maintenance request '{}' ({})", maintenanceRequest.getTitle(), maintenanceRequest.getId());
    }

    private MaintenanceRequest findMaintenanceRequestOrThrow(UUID id) {
        return maintenanceRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found with id: " + id));
    }

    private User findUserOrThrow(UUID id, String label) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(label + " not found with id: " + id));
    }

    private Building resolveBuilding(UUID buildingId) {
        if (buildingId == null) {
            return null;
        }
        return buildingRepository.findById(buildingId)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + buildingId));
    }

    private Room resolveRoom(UUID roomId) {
        if (roomId == null) {
            return null;
        }
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + roomId));
    }

}
