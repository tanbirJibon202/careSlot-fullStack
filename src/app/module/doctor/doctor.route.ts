import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { upload } from "../../lib/multer";
import { validateRequest } from "../../middleware/validateRequest";
import { DoctorValidation } from "./doctor.validation";

const router = Router();

router.post(
  "/apply-as-doctor",
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
    {
      name: "additionalFiles",
      maxCount: 10,
    },
  ]),
  validateRequest(DoctorValidation.ApplyAsDoctorZodSchema),
  DoctorController.applyAsDoctor,
);
export const DoctorRoutes = router;
