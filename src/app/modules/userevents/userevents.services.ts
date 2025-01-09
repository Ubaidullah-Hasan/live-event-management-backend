import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { User } from "../user/user.model";
import { IUserEvent } from "./userevents.interface";
import { UserEvent } from "./userevents.model";
import mongoose from "mongoose";
import { Event } from "../events/events.model";
import { USER_EVENT_TYPE } from "./userevents.constant";
import { AttendanceModel } from "../events/attendanceSchema";

const createUserEventIntoDB = async (id: string, payload: Partial<IUserEvent>) => {
    const user = await User.isUserPermission(id);

    const existEvent = await Event.findById(payload.eventId);
    if (!existEvent) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Event not found!")
    }

    const result = await UserEvent.create(
        { ...payload, userId: user._id, type: USER_EVENT_TYPE.SAVED }
    );
    return result;
};

const getEventsFilterByType = async (id: string, query: Record<string, unknown>) => {
    const userEvents = new QueryBuilder(UserEvent.find(
        { userId: id }
    ), query)
        .paginate()
        .filter()

    const events = await userEvents.modelQuery
        .populate('eventId', 'eventName image startTime soldSeat')

    return {events, count: events.length};
};


const deleteUserEvent = async (userEventId: string) => {
    if (!mongoose.isValidObjectId(userEventId)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Event id is not valid!")
    }

    const result = await UserEvent.findByIdAndDelete(userEventId);

    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User event not found!")
    }

    return null;
}


const addEventsToHistoryCreatorAndUser = async () => {
    const events = await Event.find({}).select("startTime createdBy");

    const bulkOperations: any[] = [];

    for (const event of events) {
        if (event.startTime < new Date()) {
            // added history for creator
            bulkOperations.push({
                updateOne: {
                    filter: {
                        userId: event.createdBy,
                        eventId: event._id,
                        type: USER_EVENT_TYPE.HISTORY,
                    },
                    update: {
                        $set: {
                            userId: event.createdBy,
                            eventId: event._id,
                            type: USER_EVENT_TYPE.HISTORY,
                        },
                    },
                    upsert: true,
                },
            });
            
            
            const attendees = await AttendanceModel.find({ eventId: event._id }).select("userId");
            // console.log({attendees});

            // attendence people add to history
            attendees.forEach((attendee) => {
                bulkOperations.push({
                    updateOne: {
                        filter: {
                            userId: attendee.userId,
                            eventId: event._id,
                            type: USER_EVENT_TYPE.HISTORY,
                        },
                        update: {
                            $set: {
                                userId: attendee.userId,
                                eventId: event._id,
                                type: USER_EVENT_TYPE.HISTORY,
                            },
                        },
                        upsert: true,
                    },
                });
            });
        }
    }

    if (bulkOperations.length > 0) {
        await UserEvent.bulkWrite(bulkOperations);
        console.log(`${bulkOperations.length} operations executed.`);
    } else {
        console.log("No events to add to history.");
    }
};



export const UserEventServices = {
    createUserEventIntoDB,
    getEventsFilterByType,
    deleteUserEvent,
    addEventsToHistoryCreatorAndUser,
};
