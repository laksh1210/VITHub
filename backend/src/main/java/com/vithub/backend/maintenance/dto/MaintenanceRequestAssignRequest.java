package com.vithub.backend.maintenance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload for {@code PATCH /maintenance/{id}/assign}.
 * Assigns (or, by passing a null id, unassigns) the maintenance staff
 * member responsible for a complaint.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceRequestAssignRequest {

    /** Id of the staff member to assign, or null to unassign. */
    private UUID assignedStaffId;

}
