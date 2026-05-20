# Production Grade Trading Automation System PRD
## Zerodha Kite Connect Based Multi-Strategy Trading Engine

---

# Objective

Build a scalable, production-grade automated trading backend using Node.js and Zerodha Kite Connect API.

The system must support:
- automated exit management
- automated dip-buying strategies
- GTT management
- multi-strategy architecture
- multi-broker extensibility
- production-grade observability
- safe automated execution

The architecture must follow:
- SOLID principles
- clean architecture
- layered architecture
- strategy pattern
- repository pattern
- dependency injection principles

This is NOT a simple automation script.

This is a scalable backend trading engine.

---

# Core Product Requirements

## Exit Automation Strategy

### Objective
Protect profits on existing holdings using intelligent GTT updates.

### Strategy Rules

- Run after market close
- Fetch holdings from broker
- Evaluate profit percentage
- If holding profit exceeds configured threshold:
    - create OR update GTT

### GTT Rules

- Use Single-leg GTT
- Trigger based on previous day low logic
- Never reduce existing trigger
- Only update when valid improvement exists
- Use CNC only

### Exit Conditions

- configurable target percentage
- configurable trailing logic
- configurable minimum profit requirement

### Safety Rules

- prevent duplicate GTT
- prevent unnecessary updates
- skip invalid holdings
- skip if broker rejects update
- retry failed updates maximum 2 times

---

# Dip Buy Strategy

## Objective

Buy quality stocks after controlled dips.

---

## Universe

- Nifty 250 stocks
- Future extensibility for custom universes

---

## Buy Conditions

Current release:

- daily change <= configured dip percentage
- above 50 DMA
- not already bought today
- not already held
- within max positions
- within capital allocation

---

## Order Rules

- AMO orders only
- CNC only
- quantity based on:
    - fixed capital allocation
    - minimum quantity = 1

---

## Future Extensibility

Strategy engine must support:
- RSI strategies
- volume breakout
- mean reversion
- swing trading
- momentum strategies
- AI based strategies

WITHOUT modifying engine core.

---

# Technical Architecture Requirements

## Architecture Style

Use:
- Hybrid Clean Architecture
- Layered Architecture

---

## Design Principles

Mandatory:
- SOLID principles
- separation of concerns
- inversion of control
- dependency injection
- low coupling
- high cohesion

---

# Required Design Patterns

## Strategy Pattern

Used for:
- trading strategies

Example:
- ExitStrategy
- DipBuyStrategy
- Future strategies

---

## Repository Pattern

Used for:
- Mongo persistence abstraction

Repositories must support future migration:
- MongoDB
- PostgreSQL
- Redis
- JSON fallback

WITHOUT changing business logic.

---

## Factory Pattern

Used for:
- broker initialization
- strategy loading

---

## Adapter Pattern

Used for:
- broker integrations

Examples:
- ZerodhaBroker
- UpstoxBroker
- AngelBroker

---

## Singleton Pattern

Used carefully for:
- logger
- config manager
- scheduler manager

---

# Existing Project Refactor Requirement

The current backend already contains:
- controllers
- services
- routes
- validations
- redis
- metrics
- logger
- middlewares
- docker
- tests

DO NOT rebuild from scratch.

Refactor existing architecture into:
- API layer
- Trading core layer
- Infrastructure layer
- Shared layer

The trading engine must remain isolated from Express APIs.

---

# Core Engine Requirements

## Trading Engine Responsibilities

The engine is the orchestrator.

Responsibilities:
- load strategies
- run schedules
- validate execution windows
- coordinate managers
- enforce risk rules
- maintain execution safety

The engine MUST NOT contain business strategy logic directly.

---

# Strategy Requirements

Strategies:
- MUST be independent modules
- MUST NOT directly call broker APIs
- MUST return actions/signals only

Example:
- BUY signal
- UPDATE_GTT signal
- SKIP signal

OrderManager executes actual broker actions.

---

# Order Manager Requirements

Responsibilities:
- place orders
- place GTT
- update GTT
- validate broker responses
- retry failed operations
- maintain idempotency

All broker interaction MUST happen only through OrderManager.

---

# Risk Manager Requirements

Responsibilities:
- validate max positions
- validate duplicate buys
- validate capital allocation
- validate execution timing
- validate trading window

Future extensibility:
- max daily loss
- exposure control
- sector risk
- cooldown periods

---

# Market Data Service Requirements

Responsibilities:
- fetch quotes
- fetch historical OHLC
- compute indicators
- calculate 50 DMA

The service must support:
- Zerodha APIs
- future external providers

Caching support should exist.

---

# Broker Abstraction Requirements

Create abstract broker interface.

Broker implementation must be replaceable.

Required broker methods:
- getHoldings
- getPositions
- placeOrder
- placeGTT
- updateGTT
- getQuotes
- getHistoricalData
- getOrders

Trading engine must never depend directly on Zerodha SDK.

---

# Scheduler Requirements

Use:
- node-cron

Scheduler responsibilities:
- pre-market jobs
- post-market jobs
- health jobs
- cleanup jobs

Future migration:
- BullMQ

Architecture must support migration without rewriting strategies.

---

# MongoDB Requirements

Use:
- Mongoose

Repositories must abstract schema access.

Collections may include:
- holdings
- broker_tokens
- strategy_configs
- gtt_states
- audit_logs

Trade history not required in current release.

---

# State Management Requirements

Persist:
- gtt ids
- trigger values
- buy dates
- last actions
- strategy state

State must survive:
- VPS restart
- crashes
- deployment

---

# Logging Requirements

Use structured logging.

Preferred:
- Pino OR Winston

Mandatory logging:
- strategy decisions
- order placement
- GTT updates
- skipped actions
- retry attempts
- broker failures
- validation failures

Logs must contain:
- timestamps
- execution context
- symbol
- strategy
- correlation id

---

# Observability Requirements

Keep existing metrics architecture.

Expose:
- Prometheus metrics
- health endpoints

Track:
- strategy execution duration
- order success/failure
- GTT updates
- broker latency
- scheduler status

---

# API Requirements

Expose APIs for:
- engine status
- strategy status
- portfolio sync
- manual strategy trigger
- manual GTT sync
- config visibility
- health checks

APIs must remain isolated from engine internals.

---

# Retry & Resilience Requirements

Retry:
- broker API failures
- transient network issues

Retry count:
- maximum 2

Add:
- circuit breaker support
- timeout handling
- safe failure logging

If GTT creation fails:
- log failure
- retry next valid execution cycle

Do not force sell.

---

# Configuration Requirements

Config must support:
- environment configs
- dynamic strategy configs
- feature flags

Examples:
- DRY_RUN
- MAX_POSITIONS
- DIP_PERCENT
- CAPITAL_PER_TRADE

Environment separation:
- development
- staging
- production

---

# DRY RUN Requirements

DRY_RUN must simulate:
- full execution flow
- signal generation
- order flow
- GTT flow

Without real broker execution.

---

# Authentication Requirements

Use semi-automatic Zerodha authentication.

Support:
- token refresh handling
- broker credential persistence

Future extensibility:
- multi-user broker accounts

---

# Multi User Architecture Requirement

Even if single-user initially,
architecture MUST support future:
- multiple users
- isolated broker sessions
- isolated strategies
- isolated configs

WITHOUT rewriting engine core.

---

# Future Extensibility Requirements

Architecture must support future:
- paper trading
- backtesting
- websocket live feeds
- AI strategies
- multiple brokers
- dashboard UI
- mobile app
- BullMQ workers
- TypeScript migration

WITHOUT major rewrites.

---

# Testing Requirements

Use:
- Jest

Mandatory tests:
- strategy tests
- broker mock tests
- repository tests
- risk manager tests
- engine orchestration tests

Mock:
- broker layer
- market data
- repositories

Test cases:
- duplicate prevention
- GTT update logic
- retry logic
- risk validation
- execution scheduling

---

# CI/CD Requirements

Use:
- GitHub Actions

Pipelines:
- lint
- test
- build validation

Future:
- Docker deployment pipeline

---

# Deployment Requirements

Deployment target:
- VPS

Include:
- PM2 ecosystem config
- graceful shutdown handling
- environment config loading
- health monitoring

---

# Production Safety Rules

Mandatory:

- never place duplicate orders
- never reduce GTT trigger
- never bypass risk manager
- strategies cannot call broker directly
- engine must remain stateless where possible
- repositories must abstract persistence
- retries must be bounded
- broker failures must not crash engine

---

# Final Engineering Goal

Build a maintainable trading backend that behaves like a real production trading platform and not a small automation script.

Code quality must prioritize:
- scalability
- extensibility
- maintainability
- observability
- reliability
- safety

The system should be capable of evolving into:
- a multi-user SaaS trading platform
- a multi-broker trading infrastructure
- a backtesting & strategy research platform
- a production algo trading engine

<!-- imp for AI  -->
<!-- Read the PRD carefully and strictly follow it.
Do not simplify architecture.
Do not convert into script-style implementation.
Maintain production-grade standards. -->