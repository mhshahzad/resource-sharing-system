import {getAllResources} from "../../../database/resource/get.resource";
import {getAllUsersFromGroup} from "../../../cache/group/getAllUsersFromGroup";
import {getAllRelevantRules} from "../../../cache/resourceRules/getAllRelevantRules";

export const getResourcesForUser = (userId: string): string[] => {
    const accessibleResources: string[] = [];
    const resourceIds = getAllResources().map(resource => resource.id);

    for (const resourceId of resourceIds) {
        const rules = getAllRelevantRules(resourceId);

        // Check if any rule grants access to "all"
        if (rules.some(rule => rule.everyId)) {
            accessibleResources.push(resourceId);
            continue;
        }

        for (const rule of rules) {
            // Direct user access
            if (rule.userId && rule.userId.includes(userId)) {
                accessibleResources.push(resourceId);
                break;
            }
            // Group access (multiple groups)
            if (rule.groupId) {
                for (const groupId of rule.groupId) {
                    if (getAllUsersFromGroup(groupId).includes(userId)) {
                        accessibleResources.push(resourceId);
                        break;
                    }
                }
            }
        }
    }

    return accessibleResources;
};
