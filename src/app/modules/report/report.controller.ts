import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { reportServices } from "./report.services";

const createReport = catchAsync(async (req, res) => {
    const { id } = req.user;
    const {reportedPerson, text} = req.body;

    const result = await reportServices.createReportIntoDB(reportedPerson, text, id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Report successfull.',
        data: result,
    });
});


export const reporteController = {
    createReport
}