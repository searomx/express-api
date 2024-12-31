import { Router } from "express";

import {
  requestWriterRole,
  viewRoleRequests,
  updateRoleRequest,
} from "./authorization.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post("/requestWriter", [authenticate], requestWriterRole);
router.get(
  "/roleRequests",
  [authenticate, authorize(["ADMIN"])],
  viewRoleRequests
);
router.post(
  "/roleRequests/:id",
  [authenticate, authorize(["ADMIN"])],
  updateRoleRequest
);

export default router;