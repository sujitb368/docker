const request = require("supertest");
const app = require("../src/app");

describe("Stock API", () => {

  // 🟢 GET ALL STOCKS
  describe("GET /stocks", () => {
    it("should return all stocks", async () => {
      const res = await request(app).get("/api/stocks");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // 🟢 GET STOCK BY SYMBOL
  describe("GET /stocks/:symbol", () => {

    it("should return stock for valid symbol", async () => {
      const res = await request(app).get("/api/stocks/AAPL");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("symbol", "AAPL");
    });

    it("should return 404 for invalid symbol", async () => {
      const res = await request(app).get("/api/stocks/INVALID");

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });

  });

  // 🟢 UPDATE STOCK
  describe("PUT /stocks/:symbol", () => {

    it("should update stock price", async () => {
      const res = await request(app)
        .put("/api/stocks/AAPL")
        .send({ price: 200 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("price", 200);
    });

    it("should return 404 for updating invalid stock", async () => {
      const res = await request(app)
        .put("/api/stocks/INVALID")
        .send({ price: 200 });

      expect(res.statusCode).toBe(404);
    });

  });

  // 🟢 DELETE STOCK
  describe("DELETE /stocks/:symbol", () => {

    it("should delete a stock", async () => {
      const res = await request(app).delete("/api/stocks/TSLA");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Deleted successfully");
    });

    it("should return 404 for deleting non-existing stock", async () => {
      const res = await request(app).delete("/api/stocks/UNKNOWN");

      expect(res.statusCode).toBe(404);
    });

  });

});