import {Request, Response, NextFunction} from "express";

// --- Error Handler middleware ---
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        success: false,
        data: null,
        meta: err.details || {
            source: "error-handler",
            fetchedAt: new Date().toISOString(),
        },
        error: err.message || "Internal Server Error"
    });
}