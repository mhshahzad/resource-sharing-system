import express from "express";
import {getResourcesForUser} from "../utils/user/getResourcesForUser";
import {getAllUsers} from "../../database/user/get.user";

const router = express.Router();

// GET /user/:id/resources
router.get(
    "/user/:id/resources",
    (req, res, next) => {
        try {
            const user = getAllUsers().find(u => u.id === req.params.id);
            if (!user) return next({ status: 404, message: "User not found" });
            const userResources = getResourcesForUser(req.params.id);
            res.json({resources: userResources});
        } catch (err) {
            next(err);
        }
    }
);

export default router;