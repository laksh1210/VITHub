# VITHub Backend

**AI-Powered Campus Digital Twin — Backend Service**

VIT Bhopal · Hackathon Track 3 — Campus Problem Solver
Version 1.0 · Production-ready backend

---

## 1. Project Overview

VITHub is a real-time operating system for VIT Bhopal — a single, unified platform that gives
students, faculty, security staff, hostel wardens, maintenance staff, and administrators live
visibility into campus infrastructure, student services, transportation, events, maintenance,
navigation, occupancy, and AI assistance.

Instead of juggling multiple apps, everyone opens **one dashboard — VITHub.**

This repository contains the **backend service**: a Spring Boot REST + WebSocket API that powers
the VITHub frontend, backed by PostgreSQL and Google's Gemini API for the AI assistant.

---

## 2. Features

- **Authentication** — JWT-based register / login / refresh, role-based access control
- **Buildings & Rooms** — campus building and room directory
- **Occupancy** — live room occupancy readings with heatmap-ready status tiers
- **Library** — library spaces and per-seat availability (available / occupied / reserved / out of service)
- **Canteen** — canteen directory with live queue length and estimated wait time
- **Shuttle Tracking** — shuttle fleet with live location history and ETA-ready data
- **Maintenance** — complaint lifecycle: create, assign, update status, attach images
- **Campus Events** — event listings with status, category, venue, and building/room linkage
- **Notifications** — per-user notifications with read/unread state
- **AI Assistant** — natural-language campus Q&A backed by Gemini, with chat log history
- **Dashboard** — one aggregated, campus-wide summary endpoint
- **Analytics** — deeper aggregated analytics per module (occupancy, library, canteen, shuttle,
  maintenance, events) plus a campus-wide overview
- **Real-time updates** — STOMP-over-WebSocket infrastructure for pushing live updates
- **Mock data schedulers** — background jobs that simulate live campus activity in the absence
  of real hardware/IoT feeds
- **Swagger / OpenAPI** — every endpoint documented and explorable from the browser

---

## 3. Tech Stack

| Layer | Choice |
| --- | --- |
| Language | Java 21 |
| Framework | Spring Boot 3.5 |
| Security | Spring Security + JWT (jjwt) |
| Persistence | Spring Data JPA |
| Database | PostgreSQL |
| Migrations | Flyway |
| Realtime | Spring WebSocket (STOMP over SockJS) |
| AI | Gemini 2.5 Flash (via Spring WebFlux `WebClient`) |
| API Docs | springdoc-openapi (Swagger UI) |
| Build Tool | Maven |
| Boilerplate | Lombok |

### Deployment targets

| Component | Platform |
| --- | --- |
| Backend | Railway |
| Database | Neon PostgreSQL |

---

## 4. Architecture

```
Frontend (Next.js)
      │
      │  REST API + WebSocket (STOMP/SockJS)
      ▼
Spring Boot Backend
      │
      ├──► PostgreSQL   (Spring Data JPA + Flyway)
      └──► Gemini API   (WebFlux WebClient)
```

**Design principles applied throughout:**

- Clean / layered architecture — `controller → service → repository`
- One feature per package (`room`, `occupancy`, `library`, `canteen`, `shuttle`,
  `maintenance`, `events`, `notifications`, `ai`, `dashboard`, `analytics`, …)
- DTOs only — entities are never exposed over the API
- Repository pattern via Spring Data JPA
- Constructor (dependency) injection everywhere — `@RequiredArgsConstructor` + `final` fields
- Centralized exception handling (`GlobalExceptionHandler`) → consistent error envelope
- Bean validation (`jakarta.validation`) on every request DTO
- A single, consistent JSON response envelope (`ApiResponse<T>`) on every endpoint

---

## 5. Folder Structure

```
vithub-backend/
├── src/main/java/com/vithub/backend/
│   ├── ai/                    # Gemini-backed AI assistant (client, config, service, controller)
│   ├── auth/                  # Register / login / refresh
│   ├── analytics/             # Aggregated analytics endpoints (Phase 4.5)
│   ├── building/              # Campus buildings
│   ├── canteen/                # Canteens + nested `queue` submodule
│   ├── chatlog/                # AI conversation history
│   ├── common/
│   │   ├── exception/          # Custom exceptions + GlobalExceptionHandler
│   │   └── response/            # ApiResponse envelope
│   ├── config/                  # CORS, WebSocket, OpenAPI, JPA auditing
│   ├── dashboard/                # Campus-wide summary endpoint
│   ├── entity/                    # Shared base entity, User, Role
│   ├── events/                     # Campus events
│   ├── library/                     # Library spaces + nested `seat` submodule
│   ├── maintenance/                  # Maintenance requests + nested `image` submodule
│   ├── notifications/                 # Per-user notifications
│   ├── occupancy/                      # Room occupancy readings
│   ├── repository/                      # Shared User/Role repositories
│   ├── room/                              # Campus rooms
│   ├── scheduler/                          # Mock-data background jobs
│   ├── security/                            # JWT, Spring Security config, user details
│   ├── shuttle/                              # Shuttles + nested `location` submodule
│   ├── websocket/                             # STOMP topics, message envelope, publisher
│   └── VithubBackendApplication.java
├── src/main/resources/
│   ├── db/migration/            # Flyway migrations (V1 … V17)
│   ├── application.yml
│   ├── application-dev.yml
│   └── application-prod.yml
├── src/test/java/…              # Unit tests
├── .env.example
├── pom.xml
└── README.md
```

Every feature module follows the same internal shape:
`dto/ · entity/ · repository/ · mapper/ · service/ (+ impl/) · controller/`.

---

## 6. Database

PostgreSQL, versioned with Flyway (`src/main/resources/db/migration`, `V1` → `V17`).

| # | Table |
| --- | --- |
| 1 | users |
| 2 | roles |
| 3 | buildings |
| 4 | rooms |
| 5 | occupancy |
| 6 | library |
| 7 | library_seats |
| 8 | canteens |
| 9 | canteen_queue |
| 10 | shuttles |
| 11 | shuttle_locations |
| 12 | maintenance_requests |
| 13 | maintenance_images |
| 14 | events |
| 15 | notifications |
| 16 | chat_logs |

`spring.jpa.hibernate.ddl-auto` is set to `validate` — the schema is **owned by Flyway**, never
by Hibernate auto-generation. The Analytics module introduces no new tables; it reads existing
data only.

---

## 7. Installation

**Prerequisites:** Java 21, Maven 3.9+, PostgreSQL 14+ (or a Neon connection string).

```bash
git clone <repository-url>
cd vithub-backend
cp .env.example .env   # fill in your local values
```

Create the database (if running Postgres locally):

```sql
CREATE DATABASE vithub;
```

Flyway will create/migrate all tables automatically on first run.

---

## 8. Environment Variables

All variables are documented in `.env.example` and map directly onto `application.yml`.

| Variable | Description | Default |
| --- | --- | --- |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile (`dev` / `prod`) | `dev` |
| `DB_URL` | JDBC connection string | `jdbc:postgresql://localhost:5432/vithub` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `SERVER_PORT` | HTTP port the app listens on | `8080` |
| `JWT_SECRET` | HMAC signing secret (256-bit minimum) | — |
| `JWT_ACCESS_EXPIRATION_MS` | Access token lifetime (ms) | `3600000` (1h) |
| `JWT_REFRESH_EXPIRATION_MS` | Refresh token lifetime (ms) | `604800000` (7d) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed frontend origins | `http://localhost:3000` |
| `GEMINI_API_KEY` | Gemini API key | — |
| `GEMINI_MODEL` | Gemini model name | `gemini-2.5-flash` |
| `GEMINI_BASE_URL` | Gemini API base URL | `https://generativelanguage.googleapis.com` |
| `LOG_LEVEL` | App log level | `DEBUG` |
| `JPA_SHOW_SQL` | Log generated SQL | `false` |

> **Never commit a real `.env` file or a real `JWT_SECRET` / `GEMINI_API_KEY` to source control.**

---

## 9. Running Locally

```bash
mvn spring-boot:run
```

Or build a jar and run it directly:

```bash
mvn clean package
java -jar target/vithub-backend.jar
```

The app starts on `http://localhost:8080` (or `SERVER_PORT`).

---

## 10. Swagger URL

Interactive API documentation (JWT-authorizable from the UI):

```
http://localhost:8080/swagger-ui.html
```

Raw OpenAPI JSON:

```
http://localhost:8080/v3/api-docs
```

---

## 11. WebSocket Endpoint

STOMP-over-WebSocket (SockJS fallback enabled):

```
ws://localhost:8080/ws
```

| Setting | Value |
| --- | --- |
| Connection endpoint | `/ws` |
| Application destination prefix | `/app` |
| Broker destination prefix | `/topic` |

Published topics (`/topic/...`): `dashboard`, `occupancy`, `library`, `canteen`, `shuttle`,
`maintenance`, `events`, `notifications`.

---

## 12. AI Endpoint

```
POST /api/ai/chat
```

Natural-language campus assistant backed by Gemini 2.5 Flash. Example queries it's designed to
answer: *"Where is Lab 304?"*, *"Which library is least crowded?"*, *"Where is Shuttle 2?"*.
Every request returns the standard `ApiResponse` envelope and is logged to `chat_logs`.

---

## 13. Full API Reference (by module)

All endpoints return the standard envelope:

```json
{
  "success": true,
  "message": "...",
  "data": {},
  "timestamp": "..."
}
```

| Module | Base Path |
| --- | --- |
| Auth | `/auth` |
| Buildings | `/buildings` |
| Rooms | `/rooms` |
| Occupancy | `/occupancy` |
| Library | `/library` |
| Library Seats | `/library-seats` |
| Canteens | `/canteens` |
| Canteen Queues | `/canteen-queues` |
| Shuttles | `/shuttle` |
| Shuttle Locations | `/shuttle-locations` |
| Maintenance | `/maintenance` |
| Maintenance Images | `/maintenance-images` |
| Events | `/events` |
| Notifications | `/notifications` |
| Chat Logs | `/chat-logs` |
| Dashboard | `/dashboard/summary` |
| Analytics | `/api/analytics/*` |
| AI Assistant | `/api/ai/chat` |

Full request/response contracts (fields, validation rules, path/query parameters) are documented
per-endpoint in Swagger UI.

---

## 14. Future Enhancements

- Charting / data-export (CSV, PDF) on top of the Analytics module
- Predictive analytics (crowd/queue forecasting) using historical trends
- Push notifications (mobile) alongside in-app notifications
- Fine-grained, per-role Swagger examples and response schemas
- Rate limiting on public-facing endpoints
- Caching layer for high-read aggregation endpoints (Dashboard / Analytics)

---

## 15. Team Structure

| Role | Responsibility |
| --- | --- |
| Backend Lead | Owns API contracts, services, DTOs — only role that edits API shapes |
| Frontend Lead | Next.js app, UI/UX, component library |
| AI Engineer | Gemini integration, prompt design, `/api/ai` module |
| Maps Engineer | Campus map, navigation, React Leaflet integration |
| DevOps Lead | CI/CD, deployment (Vercel / Railway / Neon), branch merges |

**Git workflow:** `feature/* → develop → main`. Nobody commits directly to `main`.

---

## 16. License

This project was built for **VIT Bhopal Hackathon — Track 3: Campus Problem Solver** and is
intended for educational and demonstration purposes.

© 2026 VITHub Team. All rights reserved unless otherwise licensed by VIT Bhopal.
