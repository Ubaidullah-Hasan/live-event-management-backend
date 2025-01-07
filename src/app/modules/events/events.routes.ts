import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import { eventValidationSchema } from "./events.validation";
import { eventController } from "./events.controller";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
import formDataProcessing from "../../middlewares/formDataProcessing";
import cron from "node-cron";

const router = Router();

router.post("/create-events",
    auth(USER_ROLE.CREATOR),
    fileUploadHandler(),
    formDataProcessing(),
    validateRequest(eventValidationSchema.eventCreateValidationSchema),
    eventController.createEvents
);

router.get("/single-event/:eventId",
    auth(USER_ROLE.CREATOR, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
    eventController.getSingleEventByEventId
);

router.get("/user-events/:creatorId",
    eventController.getAllEventsOfCreator
)

router.get("/",
    auth(USER_ROLE.CREATOR, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
    eventController.getAllEvents
);

router.get("/following-users-events",
    auth(USER_ROLE.CREATOR, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
    eventController.getFollowingUserEvents
);

router.get("/selected-categories-events",
    auth(USER_ROLE.USER),
    eventController.getMyFavouriteEvents
);


router.patch("/cancel-event/:eventId",
    auth(USER_ROLE.CREATOR),
    eventController.cancelMyEventById
);

router.get("/event-analysis/:eventId",
    auth(USER_ROLE.CREATOR),
    eventController.getSingleSlfEventAnalysisByEventId
);


router.get("/creator-events-overview",
    auth(USER_ROLE.CREATOR),
    eventController.creatorEventOverview
);


cron.schedule("0 * * * *",
    eventController.updateAllEventsTrendingStatus
);

router.patch("/:eventId",
    auth(USER_ROLE.CREATOR),
    validateRequest(eventValidationSchema.eventUpdateValidationSchema),
    eventController.updateSingleEventByEventId
);


export const EventRoutes = router;
