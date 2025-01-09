import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TermsAndConditionServices } from "./termsAndCondition.services";

const createTermsAndConditions = catchAsync(async (req, res) => {
    
    const result = await TermsAndConditionServices.createTermsAndConditions(req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Terms and conditions created successfully!',
        data: result,
    });
});




const getTermsAndConditions = catchAsync(async (req, res) => {
    const result = await TermsAndConditionServices.getTermsAndConditions();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Terms and conditions retrived successfully!',
        data: result,
    });
});


const updateTermsAndConditions = catchAsync(async (req, res) => {
    const result = await TermsAndConditionServices.updateTermsAndConditions(req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Terms and conditions update successfully!',
        data: result,
    });
});


export const TermsAndConditionsController = {
   createTermsAndConditions,
   getTermsAndConditions,
   updateTermsAndConditions,
}