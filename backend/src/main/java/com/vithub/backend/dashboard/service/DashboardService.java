package com.vithub.backend.dashboard.service;

import com.vithub.backend.dashboard.dto.DashboardSummaryDTO;

/**
 * Business operations for the Dashboard Aggregation module. Implemented
 * by {@link com.vithub.backend.dashboard.service.impl.DashboardServiceImpl}.
 */
public interface DashboardService {

    DashboardSummaryDTO getSummary();

}
