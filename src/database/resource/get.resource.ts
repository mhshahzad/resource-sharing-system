import { jsonToObj } from "../../../utils/jsonToObj";
import { Resource } from "../../schema/resource.schema";

const resources = jsonToObj<Resource[]>("./data/resource.example.json");

/**
 * Returns a shallow copy of all resources.
 *
 * @returns {Resource[]} An array containing all Resource objects.
 */
export const getAllResources = (): Resource[] => {
    return resources.map(resource => resource);
}