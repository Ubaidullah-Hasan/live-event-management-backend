import { Router } from "express";
import { TicketsController } from "./tickets.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import validateRequest from "../../middlewares/validateRequest";
import { IsMyTicketValidationSchema } from "./tickets.validation";

const router = Router();

router.get("/my-tickets",
    auth(USER_ROLE.USER),
    TicketsController.getSelfTickets
)

router.get("/is-my-ticket",
    auth(USER_ROLE.USER),
    validateRequest(IsMyTicketValidationSchema),
    TicketsController.isMyTicket
)

router.get("/:ticketId",
    auth(USER_ROLE.USER),
    TicketsController.getSingleTicket
)



export const TicketRoutes = router;