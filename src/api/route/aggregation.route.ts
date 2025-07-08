import express from "express";
import {getResourcesForUser} from "../utils/user/getResourcesForUser";
import {getAccessForResource} from "../utils/resource/getAccessForResource";
import {getAllResources} from "../../database/resource/get.resource";
import {getAllUsers} from "../../database/user/get.user";

const router = express.Router();

// GET /resources/with-user-count
router.get("/resources/with-user-count", (req, res, next) => {
    try {
        const result = getAllResources().map(resource => {
            const userIds = getAccessForResource(resource.id);
            const userCount = userIds.length;
            return {...resource, userCount: userCount};
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
});

// GET /users/with-resource-count
router.get("/users/with-resource-count", (req, res, next) => {
    try {
        const result = getAllUsers().map(user => {
            const accessibleResourceIds = new Set<string>();
            getResourcesForUser(user.id).forEach(rid => accessibleResourceIds.add(rid));
            return {
                ...user,
                resourceCount: accessibleResourceIds.size
            };
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default router;
