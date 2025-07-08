import request from "supertest";
import express from "express";
import resourceRoute from "../../src/api/route/resource.route";
import userRoute from "../../src/api/route/user.route";
import aggregationRoute from "../../src/api/route/aggregation.route";

// Setup express app for testing
const app = express();
app.use(express.json());
app.use(resourceRoute);
app.use(userRoute);
app.use(aggregationRoute);

describe("API Endpoints", () => {
    describe("GET /resources/with-user-count", () => {
        it("should return all resources with userCount", async () => {
            const res = await request(app).get("/resources/with-user-count");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toHaveProperty("userCount");
        });
    });

    describe("GET /users/with-resource-count", () => {
        it("should return all users with resourceCount", async () => {
            const res = await request(app).get("/users/with-resource-count");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toHaveProperty("resourceCount");
        });
    });

    describe("GET /resource/:id/access-list", () => {
        it("should return users with access to a valid resource", async () => {
            const res = await request(app).get("/resource/101/access-list");
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("users");
            expect(Array.isArray(res.body.users)).toBe(true);
        });

        it("should return 404 for non-existent resource", async () => {
            const res = await request(app).get("/resource/9999/access-list");
            expect(res.status).toBe(404);
        });
    });

    describe("GET /user/:id/resources", () => {
        it("should return resources accessible by a valid user", async () => {
            const res = await request(app).get("/user/1/resources");
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("resources");
            expect(Array.isArray(res.body.resources)).toBe(true);
        });

        it("should return 404 for non-existent user", async () => {
            const res = await request(app).get("/user/999/resources");
            expect(res.status).toBe(404);
        });
    });
});