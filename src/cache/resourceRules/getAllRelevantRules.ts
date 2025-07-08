import { getAllRelevantRules as getAllRelevantRulesDB } from "../../database/resourceRule/get.resourceRule";
import { serveFromCache } from "../../../utils/cache/utils/serveFromCache";
import { storeInCache } from "../../../utils/cache/utils/storeInCache";
import { ResourceRule } from "../../schema/resource-rules.schema";

const CACHE_KEY_PREFIX = "resource_rules:";

export function getAllRelevantRules(resourceId: string): ResourceRule[] {
  const cacheKey = `${CACHE_KEY_PREFIX}${resourceId}`;
  const cached = serveFromCache<ResourceRule[]>(cacheKey);
  if (cached) {
    return cached.data;
  }
  const rules = getAllRelevantRulesDB(resourceId);
  storeInCache<ResourceRule[]>(cacheKey, rules);
  return rules;
}

