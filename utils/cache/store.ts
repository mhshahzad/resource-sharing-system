import * as CONFIG from "./config.json";

/**
 * Type for CacheEntry
 */
export type CacheEntry<T = Record<string, any>> = {
    data: T;
    timestamp: number;
    expires: number;
};

/**
 * In memory cache for entries
 */
export const cache = new Map<string, CacheEntry>();

// Start periodic cache cleaning
periodicallyCleanCache();

/**
 * Removes expired entries from the cache.
 */
export function cleanupCache() {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
        if (entry.expires <= now) {
            cache.delete(key);
        }
    }
}

// --- Periodically clean expired cache entries ---
function periodicallyCleanCache() {
    const interval = Math.max(60000, CONFIG.CACHE_TTL / 2); // at least once per minute
    setInterval(() => {
        cleanupCache()
    }, interval);
}


/**
 * Returns the number of valid (non-expired) entries in the cache.
 */
export function cacheStats() {
    cleanupCache();
    return {
        size: cache.size
    };
}

/**
 * Clears all entries from the cache.
 */
export function clearCache() {
    cache.clear();
}
