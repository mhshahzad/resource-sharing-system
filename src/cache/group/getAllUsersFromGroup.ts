import { getAllUsersFromGroup as getAllUsersFromGroupDB } from "../../database/group/get.group";
import { serveFromCache } from "../../../utils/cache/utils/serveFromCache";
import { storeInCache } from "../../../utils/cache/utils/storeInCache";

const CACHE_KEY_PREFIX = "group_users:";

export function getAllUsersFromGroup(groupId: string): string[] {
  const cacheKey = `${CACHE_KEY_PREFIX}${groupId}`;
  const cached = serveFromCache<string[]>(cacheKey);
  if (cached) {
    return cached.data;
  }
  const users = getAllUsersFromGroupDB(groupId);
  storeInCache<string[]>(cacheKey, users);
  return users;
}
