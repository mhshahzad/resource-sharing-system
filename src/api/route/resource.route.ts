import express from "express";
import {getAccessForResource} from "../utils/resource/getAccessForResource";
import { getAllRelevantRules } from "../../cache/resourceRules/getAllRelevantRules";

const router = express.Router();

// GET /resource/:id/access-list
router.get(
  "/resource/:id/access-list",
  (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const resource = getAllRelevantRules(resourceId);
      if (resource.length === 0) return next({ status: 404, message: "Resource not found" });
      const userIds = getAccessForResource(resourceId);
      res.json({ users: userIds });
    } catch (err) {
      next({ status: 500, message: "Internal server error", error: err });
    }
  }
);

export default router;
