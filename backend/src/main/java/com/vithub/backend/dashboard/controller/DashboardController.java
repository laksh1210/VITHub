package com.vithub.backend.dashboard.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.dashboard.dto.DashboardSummaryDTO;
import com.vithub.backend.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Dashboard aggregation endpoint. {@code GET /dashboard/summary} matches
 * the Project Bible's API contract, powering the dashboard's real-time
 * campus overview. This is a thin pass-through to
 * {@link DashboardService} — no business logic, aggregation, or
 * repository access lives here.
 */
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Campus-wide aggregated summary")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    @Operation(summary = "Get the campus dashboard summary", description = "Returns an aggregated, campus-wide snapshot: buildings, rooms, library seats, canteens, shuttles, maintenance, events and notifications.")
    public ResponseEntity<ApiResponse<DashboardSummaryDTO>> getSummary() {
        DashboardSummaryDTO summary = dashboardService.getSummary();
        return ResponseEntity.ok(ApiResponse.success(summary));
    }

}
