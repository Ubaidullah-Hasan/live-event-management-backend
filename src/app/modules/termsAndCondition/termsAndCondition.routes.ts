import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { termsValidation } from "./termsAndCondition.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import { TermsAndConditionsController } from "./termsAndCondition.controller";

const router = Router();

router.patch("/",
    auth(USER_ROLE.SUPER_ADMIN),
    validateRequest(termsValidation.termsUpdateValidationSchema),
    TermsAndConditionsController.updateTermsAndConditions
);

router.post("/",
    auth(USER_ROLE.SUPER_ADMIN),
    validateRequest(termsValidation.termsCreateValidationSchema),
    TermsAndConditionsController.createTermsAndConditions
);

router.get("/",
    auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CREATOR, USER_ROLE.USER),
    TermsAndConditionsController.getTermsAndConditions
);



export const TermsAndConditionRoutes = router;