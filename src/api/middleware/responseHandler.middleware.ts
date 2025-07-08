import { Request, Response, NextFunction } from "express";
import {ApiMeta, ApiSource} from "../schema/api.schema";

/**
 * Function to create meta for API
 * @param source
 */
const createMeta = (source: ApiSource): ApiMeta => ({
    source,
    fetchedAt: new Date().toISOString(),
});

// --- Response Handler middleware ---
export const responseHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const oldJson = res.json.bind(res);
    res.json = (data: any): Response => {
        // If response is already an error, don't wrap
        if (data && data.success === false && data.error) {
            return oldJson.call(this, data);
        }
        const source = res.locals.cachedData ? "cache" : res.locals.responseSource || "api";
        const responseData = res.locals.cachedData || data;
        if (!res.locals.cachedData) res.locals.dataToCache = data;
        return oldJson({
            success: true,
            data: responseData,
            meta: createMeta(source),
        });
    };
    next();
};