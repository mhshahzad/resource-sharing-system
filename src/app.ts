import express from "express";
import {rateLimitMiddleware} from "./api/middleware/rateLimit.middleware";
import {responseHandler} from "./api/middleware/responseHandler.middleware";
import userRoute from "./api/route/user.route";
import resourceRoute from "./api/route/resource.route";
import aggregationRoute from "./api/route/aggregation.route";
import {errorHandler} from "./api/middleware/errorHandler.middleware";
import {cacheMiddleware} from "./api/middleware/cache.middleware";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(rateLimitMiddleware);

// Apply cache middleware to routes 
app.use("/resources/with-user-count", cacheMiddleware);
app.use("/users/with-resource-count", cacheMiddleware);
app.use("/resource/:id/access-list", cacheMiddleware);
app.use("/user/:id/resources", cacheMiddleware);

app.use(responseHandler);

app.use(userRoute);
app.use(resourceRoute);
app.use(aggregationRoute);

// Error handler should be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
