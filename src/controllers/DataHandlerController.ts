import { Request, Response } from "express";
import { DataHandlerService } from "../services/DataHandlerService";
import { STATUS_CODES } from "../config/constants/status-code";
import { MESSAGES } from "../config/constants/messages";

export class DataHandlerController {
  constructor(private service: DataHandlerService) {}

  public handleIncomingData = async (req: Request, res: Response):Promise<void> => {
    const token = req.headers["cl-x-token"];
    const method = req.method;
    const contentType = req.headers["content-type"];
    const body = req.body;

   await this.service.processData(
      typeof token === "string" ? token : "",
      method,
      contentType,
      body
    );

     res.status(STATUS_CODES.OK).json({success:true, message:MESSAGES.DATA_SENT });
  };
}
