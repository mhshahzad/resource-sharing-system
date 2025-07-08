import {getAllUsers} from "../../../database/user/get.user";
import {getAllUsersFromGroup} from "../../../cache/group/getAllUsersFromGroup";
import {getAllRelevantRules} from "../../../cache/resourceRules/getAllRelevantRules";

export const getAccessForResource = (
    resourceId: string,
): string[] => {
    const userIds = new Set<string>();
    const rules = getAllRelevantRules(resourceId);

    // If any rule grants access to "all", return all user IDs
    if (rules.some(rule => rule.everyId)) {
        return getAllUsers().map(user => user.id);
    }

    for (const rule of rules) {
        // Add direct userIds
        if (rule.userId) {
            rule.userId.forEach(userId => userIds.add(userId));
        }
        // Add users from each group in groupIds array
        if (rule.groupId) {
            rule.groupId.forEach(groupId => {
                getAllUsersFromGroup(groupId).forEach(userId => userIds.add(userId));
            });
        }
    }
    return Array.from(userIds);
}