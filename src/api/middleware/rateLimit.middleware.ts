import { Request, Response, NextFunction } from "express";
import * as CONFIG from '../config/rateLimit.config.json'

const requests: Record<string, { count: number; last: number }> = {};

// --- Rate Limit middleware ---
export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || "" ;
  const now = Date.now();
  if (!requests[ip] || now - requests[ip].last > CONFIG.REQUEST_WINDOW) {
    requests[ip] = { count: 1, last: now };
  } else {
    requests[ip].count += 1;
    requests[ip].last = now;
  }
  if (requests[ip].count > CONFIG.RATE_LIMIT) {
    // Forward error to error handler for standardized response
    return next({
      status: 429,
      message: "Too many requests",
      details: {
        source: "rate-limit",
        fetchedAt: new Date().toISOString(),
      }
    });
  }
  next();
}
