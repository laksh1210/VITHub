package com.vithub.backend.scheduler;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.shuttle.entity.Shuttle;
import com.vithub.backend.shuttle.entity.ShuttleStatus;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationRequest;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationResponse;
import com.vithub.backend.shuttle.location.entity.ShuttleLocation;
import com.vithub.backend.shuttle.location.repository.ShuttleLocationRepository;
import com.vithub.backend.shuttle.location.service.ShuttleLocationService;
import com.vithub.backend.shuttle.repository.ShuttleRepository;
import com.vithub.backend.websocket.service.NotificationPublisherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * Simulates shuttle GPS movement every 15 seconds.
 * <p>
 * For every {@link ShuttleStatus#ACTIVE} shuttle, nudges its last known
 * position by a small random offset (a gentle random walk) so the campus
 * map shows continuous movement rather than teleporting. A shuttle with
 * no location history yet is seeded near the campus center, computed as
 * the average coordinate of all buildings (falling back to VIT Bhopal's
 * approximate coordinates if none are seeded). Every ping is persisted
 * through {@link ShuttleLocationService#recordLocation} — this is a
 * history log, not a snapshot, so each tick inserts a new row, mirroring
 * how a real GPS feed would report — and broadcast over
 * {@link NotificationPublisherService#publishShuttleUpdate}.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ShuttleScheduler {

    /** Fallback campus-center latitude if no buildings are seeded (VIT Bhopal, approx.). */
    private static final BigDecimal FALLBACK_LATITUDE = new BigDecimal("23.1793");
    /** Fallback campus-center longitude if no buildings are seeded (VIT Bhopal, approx.). */
    private static final BigDecimal FALLBACK_LONGITUDE = new BigDecimal("77.2865");

    /** Max per-tick drift in degrees (~30-40m) once a shuttle already has a position. */
    private static final double STEP_DEGREES = 0.0004;
    /** Max initial spread in degrees (~500m) when seeding a shuttle's first position. */
    private static final double SEED_SPREAD_DEGREES = 0.005;

    private static final String[] DIRECTIONS = {"N", "NE", "E", "SE", "S", "SW", "W", "NW"};

    private final ShuttleRepository shuttleRepository;
    private final ShuttleLocationRepository shuttleLocationRepository;
    private final ShuttleLocationService shuttleLocationService;
    private final BuildingRepository buildingRepository;
    private final NotificationPublisherService notificationPublisherService;
    private final Random random = new Random();

    @Scheduled(fixedRate = 15_000)
    public void simulateShuttleMovement() {
        List<Shuttle> activeShuttles = shuttleRepository.findAllByStatusOrderByShuttleNumberAsc(ShuttleStatus.ACTIVE);
        if (activeShuttles.isEmpty()) {
            return;
        }

        BigDecimal[] center = resolveCampusCenter();
        List<ShuttleLocationResponse> updated = new ArrayList<>();

        for (Shuttle shuttle : activeShuttles) {
            Optional<ShuttleLocation> latest =
                    shuttleLocationRepository.findTopByShuttleIdOrderByLastUpdatedAtDesc(shuttle.getId());

            BigDecimal latitude;
            BigDecimal longitude;
            if (latest.isPresent()) {
                latitude = drift(latest.get().getLatitude(), STEP_DEGREES);
                longitude = drift(latest.get().getLongitude(), STEP_DEGREES);
            } else {
                latitude = drift(center[0], SEED_SPREAD_DEGREES);
                longitude = drift(center[1], SEED_SPREAD_DEGREES);
            }

            double speed = round1(5 + random.nextDouble() * 30);
            String direction = DIRECTIONS[random.nextInt(DIRECTIONS.length)];

            ShuttleLocationRequest request = ShuttleLocationRequest.builder()
                    .shuttleId(shuttle.getId())
                    .latitude(clampLatitude(latitude))
                    .longitude(clampLongitude(longitude))
                    .speed(speed)
                    .direction(direction)
                    .currentStopName(latest.map(ShuttleLocation::getCurrentStopName).orElse(null))
                    .build();

            updated.add(shuttleLocationService.recordLocation(request));
        }

        notificationPublisherService.publishShuttleUpdate("UPDATED", updated);
        log.debug("Simulated GPS movement for {} active shuttle(s)", activeShuttles.size());
    }

    private BigDecimal[] resolveCampusCenter() {
        List<Building> buildings = buildingRepository.findAll();
        if (buildings.isEmpty()) {
            return new BigDecimal[]{FALLBACK_LATITUDE, FALLBACK_LONGITUDE};
        }

        BigDecimal latSum = BigDecimal.ZERO;
        BigDecimal lngSum = BigDecimal.ZERO;
        for (Building building : buildings) {
            latSum = latSum.add(building.getLatitude());
            lngSum = lngSum.add(building.getLongitude());
        }
        int count = buildings.size();
        BigDecimal avgLat = latSum.divide(BigDecimal.valueOf(count), 7, RoundingMode.HALF_UP);
        BigDecimal avgLng = lngSum.divide(BigDecimal.valueOf(count), 7, RoundingMode.HALF_UP);
        return new BigDecimal[]{avgLat, avgLng};
    }

    private BigDecimal drift(BigDecimal value, double maxDegrees) {
        double offset = (random.nextDouble() * 2 - 1) * maxDegrees;
        return value.add(BigDecimal.valueOf(offset)).setScale(7, RoundingMode.HALF_UP);
    }

    private BigDecimal clampLatitude(BigDecimal latitude) {
        if (latitude.compareTo(BigDecimal.valueOf(-90)) < 0) {
            return BigDecimal.valueOf(-90);
        }
        if (latitude.compareTo(BigDecimal.valueOf(90)) > 0) {
            return BigDecimal.valueOf(90);
        }
        return latitude;
    }

    private BigDecimal clampLongitude(BigDecimal longitude) {
        if (longitude.compareTo(BigDecimal.valueOf(-180)) < 0) {
            return BigDecimal.valueOf(-180);
        }
        if (longitude.compareTo(BigDecimal.valueOf(180)) > 0) {
            return BigDecimal.valueOf(180);
        }
        return longitude;
    }

    private double round1(double value) {
        return Math.round(value * 10) / 10.0;
    }

}
