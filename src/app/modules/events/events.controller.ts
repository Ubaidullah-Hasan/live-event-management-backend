import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { eventServices } from "./events.services";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createEvents = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await eventServices.createEventsIntoDB(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Event create successfully!',
        data: result,
    });
});

const getSingleEventByEventId = catchAsync(async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { id } = req.user;

    const result = await eventServices.getSingleEventByEventId(eventId, id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Event retrived successfully!',
        data: result,
    });
});


const getSingleSlfEventAnalysisByEventId = catchAsync(async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { timeframe } = req.query;

    const result = await eventServices.getSingleSlfEventAnalysisByEventId(eventId, timeframe as string);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Event analysis retrived successfully!',
        data: result,
    });
});


const getAllEvents = catchAsync(async (req: Request, res: Response) => {

    const result = await eventServices.getAllEvents(req.query);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Events retrived successfully!',
        data: result,
    });
});


const getFollowingUserEvents = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await eventServices.getFollowingUserEvents(req.query, id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Following users events retrived successfully!',
        data: result,
    });
});



// find all the events which categories is select user
const getMyFavouriteEvents = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await eventServices.getMyFavouriteEvents(req.query, id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Selected categories events retrived successfully!',
        data: result,
    });
});

const getAllEventsOfCreator = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user;

    const result = await eventServices.getAllEventsOfCreator(req.query, id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User events retrived successfully!',
        data: result,
    });
});


const cancelMyEventById = catchAsync(async (req: Request, res: Response) => {
    const { id: creatorId } = req.user;
    const { eventId } = req.params;

    const result = await eventServices.cancelMyEventById(eventId, creatorId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User events retrived successfully!',
        data: result,
    });
});


const creatorEventOverview = catchAsync(async (req: Request, res: Response) => {
    const { id: creatorId } = req.user;

    const result = await eventServices.creatorEventOverview(creatorId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Creator events analysis data retrived successfully!',
        data: result,
    });
});


const updateAllEventsTrendingStatus = async () => {
    try {
        await eventServices.updateAllEventsTrendingStatus();
    } catch (error) {
        console.error("Error in scheduled task:", error);
    }
};


const updateSingleEventByEventId = catchAsync(async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { id } = req.user;

    const result = await eventServices.updateSingleEventByEventId(eventId, id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Event retrived successfully!',
        data: result,
    });
});


const myParticipantsEvents = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user;

    const result = await eventServices.myParticipantsEvents(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'My booking events retrived successfully!',
        data: result,
    });
});


export const eventController = {
    createEvents,
    getSingleEventByEventId,
    getAllEvents,
    getFollowingUserEvents,
    getAllEventsOfCreator,
    cancelMyEventById,
    updateAllEventsTrendingStatus,
    getSingleSlfEventAnalysisByEventId,
    creatorEventOverview,
    getMyFavouriteEvents,
    updateSingleEventByEventId,
    myParticipantsEvents,
}    