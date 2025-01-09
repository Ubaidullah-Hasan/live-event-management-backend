import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import validateRequest from "../../middlewares/validateRequest";
import { userEventValidationSchema } from "./userevents.validation";
import { UserEventController } from "./userevents.controller";
import cron from "node-cron";

const router = Router();

router.post("/",
    auth(USER_ROLE.USER),
    validateRequest(userEventValidationSchema),
    UserEventController.createUserEvent
)

router.get("/",
    auth(USER_ROLE.USER, USER_ROLE.CREATOR),
    UserEventController.getEventsFilterByType
);

router.delete("/:userEventId",
    auth(USER_ROLE.USER),
    UserEventController.deleteUserEvent
);

cron.schedule("*/30 * * * *",
    UserEventController.addEventsToHistoryCreatorAndUser
);


export const UserEventRoutes = router;