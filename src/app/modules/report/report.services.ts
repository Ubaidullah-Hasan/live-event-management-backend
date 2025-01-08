import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model"
import { Report } from "./report.model";

const createReportIntoDB = async (reportPersonId: string, text: string, selfId: string) => {
    
    await User.isUserPermission(selfId);

    const existUser = await User.findById(reportPersonId);

    if (!existUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, "This person not found.")
    }

    const result = await Report.create(
        {
            reportedBy: selfId,
            reportedPerson: reportPersonId,
            text: text
        }
    )

    return result;
}

export const reportServices = {
    createReportIntoDB,
}