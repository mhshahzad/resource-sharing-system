import {ResourceRule} from "../../schema/resource-rules.schema";
import {jsonToObj} from "../../../utils/jsonToObj";

const resourceRules = jsonToObj<ResourceRule[]>("./data/resource-rules.example.json");

/**
 * Retrieves all resource rules that are relevant to the specified resource ID.
 *
 * @param {string} resourceId - The unique identifier of the resource to filter rules for.
 * @returns {ResourceRule[]} An array of ResourceRule objects that match the given resource ID.
 */
export const getAllRelevantRules = (resourceId: string): ResourceRule[] => {
    return resourceRules.filter(rule => rule.resourceId === resourceId);
}
