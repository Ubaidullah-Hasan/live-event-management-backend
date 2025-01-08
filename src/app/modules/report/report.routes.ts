import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { reportValidationSchema } from "./report.validation";
import { reporteController } from "./report.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router()

router.post(
    "/",
    auth(USER_ROLE.USER, USER_ROLE.CREATOR),
    validateRequest(reportValidationSchema),
    reporteController.createReport
)


router.get(
    "/",
    auth(USER_ROLE.SUPER_ADMIN),
    reporteController.getAllReportBySuperAdmin
)

export const ReportRoutes = router;