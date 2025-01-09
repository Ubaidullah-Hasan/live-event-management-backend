import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { TicketModel } from "./tickets.model"

const getSelfTicket = async (userId: string) => {
    const tickets = await TicketModel.find({ createdBy: userId }).sort("-createdAt");

    return tickets;
}

const getSingleTicket = async (ticketId: string, selfId: string) => {
    const ticket = await TicketModel.findById(ticketId)
        .populate("eventId", "image eventName ticketPrice soldTicket");

    if (ticket && (ticket.createdBy.toString() !== selfId)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "You can't access another ticket.")
    }

    return ticket;
}

export const TicketServices = {
    getSelfTicket,
    getSingleTicket,
}