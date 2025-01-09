import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TicketServices } from "./tickets.services";

const getSelfTickets = catchAsync(async (req, res) => {
    const { id } = req.user;

    const result = await TicketServices.getSelfTicket(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Retrived my tickets!',
        data: result,
    });
});

const getSingleTicket = catchAsync(async (req, res) => {
    const { ticketId } = req.params;
    const { id } = req.user;
    const ticket = await TicketServices.getSingleTicket(ticketId, id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Retrived single tickets!',
        data: ticket,
    });
});


const isMyTicket = catchAsync(async (req, res) => {
    const { secretCode, ticketId } = req.body;
    const { id } = req.user;
    const ticket = await TicketServices.isMyTicket(secretCode,ticketId, id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Check your secret code!',
        data: ticket,
    });
});


export const TicketsController = {
    getSelfTickets,
    getSingleTicket,
    isMyTicket,
};