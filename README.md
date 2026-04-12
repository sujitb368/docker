
1. What is Docker? Why do we need it? 2. Docker Images & Containers
3. Installation of Docker CLI & Desktop
4. Important Docker Commands
5. Docker vs VM
6. Port Mapping & Setting Env Variables
7. Troubleshooting Containers
8. Using Containers to build Node Application
9. Dockerization of Node.js Application (Dockerfile)
10. Docker Compose
a. Services
b. Port Mapping
c. Env Variables
d. Volumes
11. Publishing to DockerHub
12. Layering in Docker Images
13. Volume Mounting
14. Docker Networking
	a. Default & Custom Networks
	b. Using custom network for multi-container apps
	c. Network drivers: Bridge, Host, Null
15. what is Docker run -it ubuntu? what is -it?

# 🚀 Stock Service Backend (Production-Ready Boilerplate)

## 📌 Overview

This project is a **production-grade backend boilerplate** built using:

* Node.js (Express)
* Redis (Caching Layer)
* MongoDB Atlas (Cloud Database)
* Docker (Containerization)
* Jest + Supertest (Automated Testing)

It is designed to simulate a **real-world scalable backend system** with proper architecture, caching, and testing strategies.

---

# 🧠 Architecture Overview

```
Client → API (Express)
           ↓
       Service Layer
       ↓        ↓
   Redis Cache  MongoDB Atlas
```

---

# 🏗️ Project Structure

```
src/
├── config/
│   ├── db.js              # MongoDB connection
│   └── redis.js           # Redis client setup
│
├── controllers/
│   └── stock.controller.js
│
├── services/
│   └── stock.service.js
│
├── routes/
│   └── stock.routes.js
│
├── models/
│   └── stock.model.js
│
├── app.js                 # Express app (for testing)
├── server.js              # App entry point
│
tests/
├── setup.js               # Test setup & cleanup
├── health.test.js
└── stock.test.js
│
docker/
└── docker-compose.yml
│
Dockerfile
.env
package.json
```

---

# ⚙️ Tech Stack

| Layer       | Technology       |
| ----------- | ---------------- |
| Backend API | Express.js       |
| Database    | MongoDB Atlas    |
| Cache       | Redis            |
| Container   | Docker           |
| Testing     | Jest + Supertest |

---

# 🔌 Environment Variables

### 📄 `.env`

```
PORT=3000

# MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/stockdb

# Redis (Docker)
REDIS_HOST=redis
REDIS_PORT=6379
```

---

# 📡 API Endpoints

### 1. Health Check

```
GET /health
```

---

### 2. Get All Stocks

```
GET /stocks
```

---

### 3. Get Stock by Symbol

```
GET /stocks/:symbol
```

---

### 4. Update Stock

```
PUT /stocks/:symbol
Body: { "price": 200 }
```

---

### 5. Delete Stock

```
DELETE /stocks/:symbol
```

---

# ⚡ Redis Caching Strategy

## Pattern Used:

👉 **Cache-Aside Pattern**

---

## Flow:

1. Request comes to API
2. Check Redis:

   * If HIT → return cached data
   * If MISS → fetch from DB
3. Store result in Redis (TTL: 60s)

---

## Cache Key Design:

```
stock:AAPL
stock:TSLA
```

---

## Cache Invalidation:

| Operation | Action       |
| --------- | ------------ |
| UPDATE    | Delete cache |
| DELETE    | Delete cache |

---

# 🧠 Service Layer Responsibility

* Business logic
* Redis caching
* DB interaction
* Cache invalidation

👉 Controllers remain thin (only request/response handling)

---

# 🗄️ MongoDB Schema

```js
{
  symbol: String (unique),
  price: Number
}
```

---

# 🐳 Docker Setup

## Services

* app (Node.js)
* redis (caching)

---

## 📄 docker-compose.yml

* Node container connects to:

  * Redis via service name (`redis`)
  * MongoDB via Atlas URL

---

## Run Project

```bash
cd docker
docker compose up --build
```

---

# 🧪 Testing Strategy

## Tools:

* Jest
* Supertest

---

## Coverage Includes:

* API success cases
* API failure cases
* Edge cases

---

## Test Isolation

Each test:

* Resets data
* Clears Redis cache

```js
beforeEach(async () => {
  await redis.flushall();
});
```

---

## Run Tests

```bash
npm test
```

---

# 🔐 MongoDB Atlas Setup

1. Create cluster in MongoDB Atlas
2. Create DB user
3. Add network access:

   ```
   0.0.0.0/0
   ```
4. Use connection string in `.env`

---

# ⚠️ Known Limitations (Current Stage)

* No authentication layer
* No rate limiting
* No logging system (Winston/Morgan)
* No validation layer (Joi/Zod)
* No CI/CD pipeline

---

# 🚀 Future Enhancements

* Add authentication (JWT)
* Add request validation
* Add logging & monitoring
* Add rate limiting
* Add Nginx (reverse proxy + load balancing)
* Add CI/CD pipeline
* Add Kubernetes deployment

---

# 🧠 Key Learnings

* Layered architecture (Controller → Service → DB)
* Redis caching with TTL and invalidation
* Docker-based service orchestration
* Writing stable and isolated tests
* Handling async operations properly

---

# 👨‍💻 Author Notes

This project is built as a **learning-to-production journey**, focusing on:

* Clean architecture
* Real-world backend patterns
* Scalable system design

---

