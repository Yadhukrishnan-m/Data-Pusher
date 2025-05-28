import { Request, Response, NextFunction } from "express";
import { IDestinationService } from "../interfaces/IDestinationService";
import {
  createDestinationSchema,
  updateDestinationSchema,
} from "../validators/DestinationSchema";
import { STATUS_CODES } from "../config/constants/status-code";
import { MESSAGES } from "../config/constants/messages";

export class DestinationController {
  constructor(private _service: IDestinationService) {}
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { accountId } = req.params;

      const parsed = createDestinationSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: MESSAGES.VALIDATION_FAILED,
          errors: parsed.error.format(),
        });
        return;
      }
      const destination = await this._service.create(accountId, parsed.data);

      res.status(STATUS_CODES.CREATED).json({
        success: true,
        message: MESSAGES.DESTINATION_CREATED,
        data: destination,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dest = await this._service.getById(req.params.id);

      res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.DESTINATION_FETCHED,
        data: dest,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const parsed = updateDestinationSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: MESSAGES.VALIDATION_FAILED,
          errors: parsed.error.format(),
        });
        return;
      }

      const updated = await this._service.update(req.params.id, parsed.data);
      if (!updated) {
        res.status(STATUS_CODES.NOT_FOUND).json({
          success: false,
          message: MESSAGES.DESTINATION_NOT_FOUND,
        });
        return;
      }

      res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.DESTINATION_UPDATED,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._service.delete(req.params.id);
      res
        .status(STATUS_CODES.OK)
        .json({ success: true, message: MESSAGES.DESTINATION_DELETED });
    } catch (error) {
      next(error);
    }
  };

  getByAccountId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const destinations = await this._service.getAllByAccount(
        req.params.accountId
      );
      res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.DESTINATIONS_FETCHED,
        data: destinations,
      });
    } catch (error) {
      next(error);
    }
  };
}
