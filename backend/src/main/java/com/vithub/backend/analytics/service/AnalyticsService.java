package com.vithub.backend.analytics.service;

import com.vithub.backend.analytics.dto.AnalyticsSummaryDTO;

/**
 * Business operations for the Analytics module. Implemented by
 * {@link com.vithub.backend.analytics.service.impl.AnalyticsServiceImpl}.
 * All figures are computed from existing module data through existing
 * repositories only — no new entities, tables or repository methods are
 * introduced by this module.
 */
public interface AnalyticsService {

    AnalyticsSummaryDTO getOverview();

    AnalyticsSummaryDTO.OccupancyAnalytics getOccupancyAnalytics();

    AnalyticsSummaryDTO.LibraryAnalytics getLibraryAnalytics();

    AnalyticsSummaryDTO.CanteenAnalytics getCanteenAnalytics();

    AnalyticsSummaryDTO.ShuttleAnalytics getShuttleAnalytics();

    AnalyticsSummaryDTO.MaintenanceAnalytics getMaintenanceAnalytics();

    AnalyticsSummaryDTO.EventsAnalytics getEventsAnalytics();

}
