# MASTER_CONTEXT.md

# Project Name

Production Grade Trading Automation System

---

# Project Goal

Build a scalable, production-grade automated trading backend using Node.js and Zerodha Kite Connect API.

The system must support:
- automated dip-buy strategies
- automated exit/GTT management
- multi-strategy architecture
- multi-broker extensibility
- production-grade observability
- safe order execution
- future multi-user support

This is NOT a script-based automation project.

This is a modular backend trading engine.

---

# Existing Stack

## Backend
- Node.js
- Express.js
- Zerodha Kite

## Database
- MongoDB
- Mongoose

## Cache / Infra
- Redis

## Testing
- Jest

## Deployment
- VPS
- PM2

## Metrics
- Prometheus compatible metrics

## CI/CD
- GitHub Actions

---

# Existing Project Structure

The project already contains:
- controllers
- services
- routes
- validations
- middlewares
- redis setup
- logger
- metrics
- docker setup
- testing setup

Architecture must EVOLVE from existing structure.

Do NOT rewrite entire project from scratch.

---

# Core Architecture Rules

## Mandatory Principles

- SOLID principles
- clean architecture
- layered architecture
- separation of concerns
- dependency injection
- low coupling
- high cohesion

---

# Mandatory Design Patterns

## Strategy Pattern
Used for:
- trading strategies

Examples:
- ExitStrategy
- DipBuyStrategy

---

## Repository Pattern
Used for:
- MongoDB abstraction
- future DB migration support

Repositories must isolate database logic.

---

## Adapter Pattern
Used for:
- broker integrations

Examples:
- ZerodhaBroker
- UpstoxBroker
- AngelBroker

---

## Factory Pattern
Used for:
- broker creation
- strategy loading

---

# Critical Architecture Constraints

## Strategies MUST NOT
- call broker directly
- place orders directly
- access Express request/response
- contain infrastructure logic

Strategies only generate:
- BUY signals
- SELL signals
- GTT update signals
- SKIP decisions

---

## OrderManager Responsibilities

ONLY OrderManager can:
- place orders
- create GTT
- update GTT
- communicate with broker layer

All broker operations must go through OrderManager.

---

## TradingEngine Responsibilities

TradingEngine is the orchestrator.

Responsibilities:
- execute strategies
- coordinate managers
- enforce execution lifecycle
- manage scheduling flow

TradingEngine MUST NOT:
- contain trading strategy logic
- contain indicator logic
- access database directly

---

# Strategy Rules

## Exit Strategy

- runs after market close
- evaluates holdings
- manages GTT updates
- uses single-leg GTT
- never reduces trigger
- updates only when applicable

---

## Dip Buy Strategy

- runs before market open
- execution window: 8 AM – 9 AM
- universe: Nifty 250
- daily change based dip buying
- uses AMO CNC orders

---

# Trading Rules

## Capital Allocation
- configurable
- default fixed capital per trade = 5000 INR

---

## Quantity Rules
- minimum quantity = 1
- quantity based on available capital

---

## Max Positions
- configurable
- default = 50

---

## Duplicate Prevention
- no duplicate buys on same day
- no duplicate GTT creation

---

# Broker Rules

## Current Broker
- Zerodha Kite Connect

## Future Brokers
- Upstox
- Angel One
- ICICI Breeze

Architecture must support future brokers WITHOUT engine rewrite.

---

# Scheduler Rules

## Current Scheduler
- node-cron

## Future Scheduler
- BullMQ

Architecture must support migration.

---

# Persistence Rules

## Current Database
- MongoDB

## Future Migration Support
- PostgreSQL

Use repository abstraction from beginning.

---

# Logging Rules

Use:
- structured logging
- timestamped logs
- contextual logs

Mandatory log events:
- strategy decisions
- order placement
- GTT updates
- retries
- broker failures
- skipped actions

---

# Retry Rules

- retry transient failures only
- max retry count = 2
- bounded retries only

---

# DRY RUN Rules

DRY_RUN mode must:
- simulate full execution flow
- simulate broker calls
- avoid real order placement

---

# Authentication Rules

Use:
- semi-automatic Zerodha authentication

Support:
- token refresh
- token persistence

---

# Future Extensibility Requirements

Architecture must support future:
- paper trading
- backtesting
- websocket live feeds
- AI strategies
- dashboard UI
- mobile app
- multi-user support
- TypeScript migration

WITHOUT major rewrites.

---

# API Rules

REST APIs should expose:
- engine status
- strategy status
- health checks
- manual triggers
- config visibility
- GTT sync operations

APIs MUST remain isolated from engine internals.

---

# Testing Rules

Use:
- Jest

Mandatory testing:
- strategy tests
- broker mock tests
- repository tests
- engine tests
- retry tests
- risk validation tests

---

# CI/CD Rules

Use:
- GitHub Actions

Pipelines:
- lint
- test
- build validation

---

# Deployment Rules

Deployment target:
- VPS

Must support:
- PM2 ecosystem
- graceful shutdown
- health monitoring

---

# Naming Conventions

## File Naming

- *.service.js
- *.manager.js
- *.repository.js
- *.strategy.js
- *.controller.js
- *.middleware.js

---

# Dependency Rules

## Allowed Dependency Flow

API Layer
→ Engine Layer
→ Managers
→ Repositories
→ Infrastructure

Strategies
→ Managers only

Repositories
→ Database only

Broker Layer
→ External APIs only

---

# Forbidden Dependency Flow

- Strategy → Broker
- Strategy → Database
- Controller → Broker
- Controller → Repository
- Repository → Strategy

---

# Code Quality Rules

All generated code must:
- use async/await
- use proper error handling
- use dependency injection
- avoid tight coupling
- avoid duplicated logic
- avoid massive classes
- be production-grade
- be easily testable

---

# AI Generation Rules

When generating code:
- generate one bounded module at a time
- avoid giant implementations
- prioritize architecture over speed
- keep modules isolated
- keep code extensible

Never generate:
- script-style implementations
- tightly coupled modules
- business logic inside controllers
- direct broker access from strategies

---

# Engineering Goal

Build a maintainable, scalable backend trading engine capable of evolving into:
- multi-user trading platform
- multi-broker infrastructure
- production algo trading system
- strategy research platform