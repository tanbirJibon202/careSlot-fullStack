import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DoctorServices } from "./doctor.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ApplyAsDoctorValidationZodSchema } from "./doctor.validation";

const applyAsDoctor = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const resume = files?.["resume"] ? files["resume"][0] : null;
  const additionalFiles = files?.["additionalFiles"] || [];

  const ZodValidationResult = ApplyAsDoctorValidationZodSchema.safeParse(
    JSON.parse(req.body.data),
  );

  if (!ZodValidationResult.success) {
    throw new Error(ZodValidationResult.error.issues[0].message);
  }

  const payload = ZodValidationResult.data;

  const result = await DoctorServices.applyAsDoctor(
    payload,
    resume,
    additionalFiles,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Applied As Doctor Successfully",
    data: result,
  });
});

const VerifyDoctorEmail = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await DoctorServices.VerifyDoctorEmail(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Email Verified Successfully",
    data: result,
  });
});

const approveDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user!;
  const result = await DoctorServices.approveDoctor(payload, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Email Verified Successfully",
    data: result,
  });
});

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await DoctorServices.getAllDoctors(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors Retrieved Successfully",
    data: data,
    meta: meta,
  });
});

export const DoctorController = {
  applyAsDoctor,
  VerifyDoctorEmail,
  approveDoctor,
  getAllDoctors,
};
