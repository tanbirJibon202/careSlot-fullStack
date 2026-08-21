import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";
import { catchAsync } from "../../utils/catchAsync";
import z from "zod";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidation.PatientRegistrationZodSchema),
  AuthController.registerPatient,
);

router.post(
  "/verify-email",
  validateRequest(UserValidation.PatientEmailVerifyZodSchema),
  AuthController.verifyPatientEmail,
);

router.post(
  "/login",
  validateRequest(UserValidation.LoginZodSchema),
  AuthController.loginUser,
);
router.get(
  "/me",
  auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  // validateRequest
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
router.post(
  "/forgot-password",
  validateRequest(UserValidation.forgotPasswordZodSchema),
  AuthController.forgotPassword,
);
router.post(
  "/reset-password",
  validateRequest(UserValidation.resetPasswordZodSchema),
  AuthController.resetPassword,
);
export const AuthRoutes = router;
