import { cache as Store, CacheEntry } from "../store";

/**
 * Retrieves a cached entry for the specified key if it exists and is still valid.
 *
 * @param {string} key - The unique identifier for the cache entry to retrieve.
 * @returns {CacheEntry<T> | undefined} The cached entry if valid, otherwise undefined.
 */
export const serveFromCache = <T = Record<string, any>>(
  key: string,
): CacheEntry<T> | undefined => {
  const cached = Store.get(key) as CacheEntry<T> | undefined;
  if (cached && cached.expires > Date.now()) {
    return cached;
  }
  return undefined;
};
