import { Request, Response, NextFunction } from "express";
import { serveFromCache } from "../../../utils/cache/utils/serveFromCache";
import { storeInCache } from "../../../utils/cache/utils/storeInCache";

// --- Cache middleware ---
export const cacheMiddleware =(req: Request, res: Response, next: NextFunction)=> {
  const key = req.originalUrl;
  const cached = serveFromCache(key);

  if (cached) {
    res.locals.cachedData = cached.data;
    return next();
  }

  // After responseHandler runs, cache the formatted response
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    if (res.locals.dataToCache) {
      storeInCache(key, res.locals.dataToCache);
    }
    return originalJson(body);
  };

  next();
}
