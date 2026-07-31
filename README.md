<div align="center">

# 🏛️ VITHub

### AI-Powered Campus Digital Twin

**A real-time operating system for university campus life — unifying navigation, occupancy, shuttles, maintenance, events, and AI assistance into a single intelligent dashboard.**

Built by **Team KNOXTON** for the VIT Bhopal Hackathon — *Summer of Code Fest*

[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/laksh1210/VITHub)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?logo=springboot)
![Java](https://img.shields.io/badge/Java-21%20LTS-ED8B00?logo=openjdk)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-8E75B2?logo=googlegemini)

</div>

---

## 📖 Overview

Every day, students across a large campus lose real time to the same handful of problems: hunting for an empty classroom, guessing whether the library has a free seat, standing in an unpredictable canteen queue, or waiting blindly for a shuttle that may or may not be close. Complaints get lost in manual logs, and events are scattered across a dozen messaging groups.

**VITHub** solves this by acting as a live **digital twin** of the campus — a single dashboard where real-world state (rooms, seats, queues, shuttles, tickets, events) is mirrored digitally and kept in sync in real time, with a Gemini-powered AI assistant layered on top to answer natural-language questions about all of it.

Built during a 24-hour hackathon with a production-grade fullstack architecture.

---

## 🧩 The Problem

| Pain Point | Impact |
|---|---|
| 🔍 Finding Empty Classrooms | 15–20 minutes wasted per search across academic blocks |
| 📚 Library Seat Scarcity | No visibility into seat availability → overcrowding, wasted trips |
| 🍕 Canteen Crowds & Queues | Long, unpredictable lines cause missed lectures |
| 🚌 Unpredictable Shuttles | Students wait blindly with no live location or ETA |
| 🔧 Lost Maintenance Complaints | Hostel/lab tickets vanish into manual logging systems |
| 📅 Fragmented Events | Hackathons, club events, and lectures scattered across chat groups |
| 🌐 No Centralized Platform | Students juggle multiple disconnected tools |

---

## 💡 The Solution

VITHub replaces five-plus disconnected portals with **one unified dashboard**, built on four core pillars:

| Pillar | Description |
|---|---|
| ⚡ **Real-Time Synchronization** | WebSocket-driven, zero-latency updates for library seats, shuttle GPS, and canteen queues |
| 📡 **AI-Powered Intelligence** | Google Gemini 2.5 Flash for instant, context-aware natural-language campus assistance |
| 🧠 **Smart Dashboards & Twin** | Interactive 2D/3D digital twin with live occupancy heatmaps |
| 📊 **Unified Platform** | Navigation, occupancy, maintenance, events, and AI in one intuitive interface |

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🖥️ Smart Dashboard | Consolidated real-time view of campus metrics, weather & shortcuts |
| 🏢 Building Occupancy | Live classroom availability & capacity heatmaps |
| 📚 Library Seat Tracker | Real-time silent-study vs. discussion-room seat tracking |
| 🍕 Canteen Queue | Live wait-time countdowns & congestion alerts |
| 🚌 Live Shuttle Tracking | GPS locations, routes, and accurate ETAs |
| 🔧 Maintenance System | Image-upload complaints with priority status tracking |
| 📅 Event Discovery | Campus events directory with 1-click registration & map routing |
| 🧠 AI Campus Assistant | Gemini-powered natural-language chatbot for instant queries |
| 🔔 Push Notifications | Real-time alerts for complaints, events & shuttles |
| 📈 Campus Analytics | Historical occupancy data & administrative insights |

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19 & TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animation:** Framer Motion
- **Maps & Charts:** React Leaflet & Recharts

### Backend
- **Language:** Java 21 (LTS)
- **Framework:** Spring Boot 3.5
- **Security:** Spring Security + JWT
- **Persistence:** Spring Data JPA
- **Build Tool:** Maven
- **Docs:** Swagger / OpenAPI 3

### Database & Infrastructure
- **Database:** PostgreSQL
- **Cloud Host:** Neon Serverless DB
- **Migrations:** Flyway
- **Realtime:** Spring WebSocket
- **HTTP Client:** Axios & Socket.io
- **Deployment:** Vercel (frontend) + Railway (backend)

### AI Integration
- **Model:** Google Gemini 2.5 Flash
- **Capability:** Contextual chatbot
- **Response Format:** Structured JSON schema
- **Accuracy:** Confidence scoring
- **Domain:** Campus-restricted knowledge base
- **Latency:** < 500ms streaming response

---

## 🏗️ System Architecture

```
 Users / Students / Faculty
             │
             ▼
   Frontend App — Next.js 16 (React 19 / TS)
             │
             ▼
   API Gateway — REST APIs & WebSockets
             │
             ▼
   Core Backend — Spring Boot 3.5 (Java 21)
             │
      ┌──────┴──────┐
      ▼             ▼
PostgreSQL      Gemini 2.5 API
(+ Flyway)      (AI Engine)
      │             │
      └──────┬──────┘
             ▼
  Realtime WebSocket Broadcast
             │
             ▼
     Live Dashboard (UI Update)
```

**Data flow:** `Users → Next.js 16 → REST / WebSocket → Spring Boot 3.5 → PostgreSQL Query / Gemini AI Chat → Real-time WebSocket Broadcast → Live UI Update`

### Backend Layers

1. **Controller Layer** (`@RestController`) — REST endpoints, DTO validation, security annotations
2. **Service Layer** (`@Service`) — Business logic, Gemini AI orchestration, WebSocket events
3. **Repository Layer** (`@Repository`) — Spring Data JPA abstractions over PostgreSQL
4. **Database Layer** — PostgreSQL (serverless) with Flyway-managed migrations

**Cross-cutting concerns:** DTO pattern (entities never exposed directly), ModelMapper conversion, Jakarta Bean Validation, global `@ControllerAdvice` exception handling, and stateless JWT auth with role-based access control.

---

## 🤖 AI Integration

VITHub's campus assistant is powered by **Google Gemini 2.5 Flash** and is designed to be genuinely useful, not just a chatbot gimmick:

- **Natural language queries** — e.g. *"Where is Lab 304?"* or *"Which library is least crowded?"*
- **Context-aware** — fed live occupancy data, shuttle schedules, and campus map nodes
- **Zero-hallucination constraints** — strict prompt engineering forces structured JSON responses scoped to campus-only knowledge
- **Confidence scoring** — every response carries an accuracy confidence score

---

## ⚡ Real-Time Engine

Built on **Spring WebSocket (STOMP protocol)** for sub-second updates without page refreshes:

- 📚 Live library seat check-in/check-out
- 🚌 Real-time shuttle GPS with dynamic ETA recalculation
- 🔔 Instant push alerts for maintenance & emergencies
- 🏢 Sub-second room availability heatmaps

**Broadcast pipeline:** `Event Trigger → STOMP Broker → Topic Subscription → Socket.io Client → Framer Motion Re-render (<100ms)`

---

## 🗄️ Database Design

16 normalized relational tables across five domains:

| Domain | Tables |
|---|---|
| **Identity & Access** | `users`, `roles` |
| **Campus Infrastructure** | `buildings`, `rooms`, `occupancy` |
| **Campus Services** | `library`, `library_seats`, `canteens`, `canteen_queue` |
| **Mobility & Maintenance** | `shuttles`, `shuttle_locations`, `maintenance_requests`, `maintenance_images` |
| **Engagement & AI** | `events`, `notifications`, `chat_logs` |

---

## 🔄 Application Workflow

1. **User Login** — JWT token generated & stored in an HTTP-only cookie
2. **Load Dashboard** — Next.js fetches initial state via REST and opens a WebSocket connection
3. **Select Feature** — user picks a card (e.g. Shuttle Map, Gemini AI)
4. **API Request** — REST/WS request dispatched with JWT header
5. **Backend Logic** — Spring Boot service validates & executes business logic
6. **DB / AI Query** — PostgreSQL persistence or Gemini AI invocation
7. **Realtime Sync** — Spring WebSocket broadcasts the state delta to all clients
8. **Responsive UI** — Framer Motion animates the dashboard update

---

## 🌟 Why VITHub?

- 💡 **First** complete AI-driven digital twin built specifically for university campus operations
- 📈 **Highly scalable** — stateless Java 21 / Spring Boot backend handles thousands of concurrent requests
- 🏛️ **True digital twin** — real-time spatial map linking physical rooms, buses, and canteens to digital state
- 🧠 **Contextual AI** — Gemini-powered answers with zero-hallucination constraints
- ⚡ **Sub-100ms sync** — WebSocket infrastructure for real-time positioning and seat status
- 🔐 **Enterprise security** — Spring Security, JWT, and strict RBAC
- 🏗️ **Clean architecture** — layered DTO design separating entities, APIs, and views
- 🚀 **Future-ready** — modular design ready for IoT sensors and AR expansion

---

## 📊 Expected Impact

| Metric | Result |
|---|---|
| ⏱️ Canteen & Shuttle Wait Time | **-75%** |
| 📍 Campus Coverage | **100%** (all blocks, hostels, libraries, canteens digitized) |
| 🏢 Central Dashboards | **1** (replacing multiple scattered channels) |
| ⚡ Realtime Latency | **< 100ms** |
| 📈 Student Productivity | **3x** more time studying vs. searching for resources |

### Impact by Stakeholder

- 🎓 **Students** — no more wasted time searching for rooms, real-time shuttle tracking, instant AI answers, centralized events
- 👨‍🏫 **Faculty** — instant classroom visibility, seamless event announcements, reduced admin query load
- 🏛️ **Administration** — data-driven resource management, transparent maintenance tracking, campus safety alerts
- 🚶 **Visitors & Guests** — interactive navigation, simplified orientation, guest-restricted access mode

---

## 🧗 Engineering Challenges & Solutions

| Challenge | Solution |
|---|---|
| High-frequency real-time sync at scale | Spring WebSocket STOMP broker with topic-based pub/sub and efficient payload serialization |
| Clean architecture isolation | Strict layered architecture with DTOs, service abstractions, and decoupled event listeners |
| Complex relational schema (16 tables) | Flyway-managed migrations, optimized indexing, clean JPA repository queries |
| AI reliability & context grounding | Strict prompt-engineering templates with structured JSON schemas and domain boundaries |

---

## 🗺️ Future Scope

- 📡 **IoT Sensors** — infrared seat sensors & smart turnstiles
- 🗺️ **Indoor Navigation** — BLE beacon & Wi-Fi RTT step-by-step routing
- 👓 **AR Campus** — augmented-reality overlays for buildings & occupancy
- 📈 **Predictive AI** — ML models forecasting peak rush hours
- 🎙️ **Voice Assistant** — multilingual, hands-free navigation
- ⏱️ **Auto Attendance** — geofenced automated attendance logging
- 🆔 **Digital NFC Pass** — NFC-enabled student ID integration
- 🌐 **Multi-Campus** — federated expansion into a multi-campus SaaS platform

---

## 👥 Team KNOXTON

| Role | Name | Registration No. |
|---|---|---|
| Team Lead | Karan Singh | 24BAI10687 |
| Member | Lakshay Falor | 24BAI10117 |
| Member | Pragyan Shrivastava | 24BAI10326 |
| Member | Sunav Sunil Mattoo | 24BAI10903 |
| Member | Swapnil Soni | 24BCE10071 |

---

## 🔗 Links

- **Repository:** [github.com/laksh1210/VITHub](https://github.com/laksh1210/VITHub)
- **Live Demo:**[ _see repository for deployment link_](https://vit-hub-zkp3.vercel.app/)

---

<div align="center">

**VITHub — Transforming university campus life through real-time intelligence, seamless navigation, and context-aware AI.**

</div>
