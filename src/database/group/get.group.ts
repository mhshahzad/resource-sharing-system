import {Group} from "../../schema/group.schema";
import {jsonToObj} from "../../../utils/jsonToObj";

const GROUP_DATA_PATH = "./data/group.example.json";
let groups = jsonToObj<Group[]>(GROUP_DATA_PATH);

/**
 * Retrieves all user IDs from the group with the specified ID.
 *
 * @param {string} groupId - The unique identifier of the group.
 * @returns {string[]} An array of user IDs belonging to the group, or an empty array if the group is not found.
 */
export const getAllUsersFromGroup = (groupId: string): string[] => {
    const group = groups.find(g => g.id === groupId);
    return group ? group.userIds : [];
}

