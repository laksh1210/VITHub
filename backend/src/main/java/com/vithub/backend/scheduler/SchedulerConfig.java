package com.vithub.backend.scheduler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

/**
 * Infrastructure for the mock scheduler module (Phase 5). {@code @EnableScheduling}
 * is already active on {@link com.vithub.backend.VithubBackendApplication}; this
 * class only supplies the {@link TaskScheduler} that backs it.
 * <p>
 * Spring Boot's default {@code @Scheduled} support runs on a single-threaded
 * pool, which would serialize every scheduler in this package behind one
 * another regardless of their independent intervals (15s shuttle ticks would
 * queue behind a slow 5-minute event sweep, etc). A small dedicated pool lets
 * {@link OccupancyScheduler}, {@link LibraryScheduler}, {@link CanteenScheduler},
 * {@link ShuttleScheduler}, {@link MaintenanceScheduler} and {@link EventScheduler}
 * all fire independently and on time.
 */
@Configuration
public class SchedulerConfig {

    /**
     * Bean name {@code taskScheduler} is significant: Spring Boot's
     * {@code TaskSchedulingAutoConfiguration} looks for a bean with this
     * exact name (or a single {@link TaskScheduler} bean) before falling
     * back to its own single-threaded default.
     */
    @Bean
    public TaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(6);
        scheduler.setThreadNamePrefix("vithub-mock-scheduler-");
        scheduler.setErrorHandler(throwable ->
                org.slf4j.LoggerFactory.getLogger(SchedulerConfig.class)
                        .error("Uncaught error in a mock scheduler task", throwable));
        scheduler.setWaitForTasksToCompleteOnShutdown(true);
        scheduler.setAwaitTerminationSeconds(5);
        scheduler.initialize();
        return scheduler;
    }

}
