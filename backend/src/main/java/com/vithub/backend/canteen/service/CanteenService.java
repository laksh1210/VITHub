package com.vithub.backend.canteen.service;

import com.vithub.backend.canteen.dto.CanteenRequest;
import com.vithub.backend.canteen.dto.CanteenResponse;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Canteen module. Implemented by
 * {@link com.vithub.backend.canteen.service.impl.CanteenServiceImpl}.
 */
public interface CanteenService {

    List<CanteenResponse> getAllCanteens(UUID buildingId);

    CanteenResponse getCanteenById(UUID id);

    CanteenResponse getCanteenByName(String name);

    CanteenResponse createCanteen(CanteenRequest request);

    CanteenResponse updateCanteen(UUID id, CanteenRequest request);

    void deleteCanteen(UUID id);

}
