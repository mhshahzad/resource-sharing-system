import {cache as Store} from "../store";
import * as CONFIG from "../config.json";

/**
 * Stores the provided data in the cache under the specified key with a timestamp and expiration.
 *
 * @param {string} key - The unique identifier for the cache entry.
 * @param {T} data - The data to be cached.
 */
export const storeInCache = <T extends Record<string, any>>(
    key: string,
    data: T,
): void => {
  const now = Date.now();
  Store.set(key, {
    data,
    timestamp: now,
    expires: now + CONFIG.CACHE_TTL,
  });
};