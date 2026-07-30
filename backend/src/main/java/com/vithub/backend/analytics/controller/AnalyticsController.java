package com.vithub.backend.analytics.controller;

import com.vithub.backend.analytics.dto.AnalyticsSummaryDTO;
import com.vithub.backend.analytics.service.AnalyticsService;
import com.vithub.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Analytics aggregation endpoints under {@code /api/analytics}. Each
 * endpoint is a thin pass-through to {@link AnalyticsService} — no
 * business logic, aggregation, or repository access lives here. Every
 * figure is computed from existing module data at request time; no new
 * entities, tables or repositories are introduced by this module.
 */
@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Campus-wide analytics derived from existing module data")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/overview")
    @Operation(summary = "Get the campus analytics overview",
            description = "Returns an aggregated, campus-wide analytics snapshot: buildings, rooms, users, "
                    + "libraries, canteens, shuttles, maintenance, events and notifications.")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO>> getOverview() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getOverview()));
    }

    @GetMapping("/occupancy")
    @Operation(summary = "Get classroom occupancy analytics",
            description = "Returns room occupancy figures and a breakdown by occupancy status "
                    + "(available, moderate, crowded, full).")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO.OccupancyAnalytics>> getOccupancyAnalytics() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getOccupancyAnalytics()));
    }

    @GetMapping("/library")
    @Operation(summary = "Get library analytics",
            description = "Returns library seat figures and a breakdown by seat status "
                    + "(available, occupied, reserved, out of service).")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO.LibraryAnalytics>> getLibraryAnalytics() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getLibraryAnalytics()));
    }

    @GetMapping("/canteen")
    @Operation(summary = "Get canteen analytics",
            description = "Returns canteen counts and average queue length / estimated wait time across "
                    + "all canteens.")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO.CanteenAnalytics>> getCanteenAnalytics() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getCanteenAnalytics()));
    }

    @GetMapping("/shuttle")
    @Operation(summary = "Get shuttle analytics",
            description = "Returns shuttle counts broken down by operational status "
                    + "(active, inactive, maintenance).")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO.ShuttleAnalytics>> getShuttleAnalytics() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getShuttleAnalytics()));
    }

    @GetMapping("/maintenance")
    @Operation(summary = "Get maintenance analytics",
            description = "Returns maintenance request counts broken down by status "
                    + "(open, in progress, resolved, closed) and by priority "
                    + "(low, medium, high, critical).")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO.MaintenanceAnalytics>> getMaintenanceAnalytics() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getMaintenanceAnalytics()));
    }

    @GetMapping("/events")
    @Operation(summary = "Get campus events analytics",
            description = "Returns event counts broken down by lifecycle status "
                    + "(upcoming, ongoing, completed, cancelled).")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO.EventsAnalytics>> getEventsAnalytics() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getEventsAnalytics()));
    }

}
