import { NextFunction, Request, Response } from "express";
import { IAccountService } from "../interfaces/IAccountService";
import {
  createAccountSchema,
  updateAccountSchema,
} from "../validators/AccountSchema";
import { STATUS_CODES } from "../config/constants/status-code";
import { MESSAGES } from "../config/constants/messages";

export class AccountController {
  private _accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this._accountService = accountService;
  }

  createAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const parseResult = createAccountSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: MESSAGES.VALIDATION_FAILED,
          errors: parseResult.error.format(),
        });
        return;
      }
      const accountData = parseResult.data;
      const account = await this._accountService.createAccount(accountData);

      res.status(STATUS_CODES.CREATED).json({
        success: true,
        message: MESSAGES.ACCOUNT_CREATED,
        data: account,
      });
    } catch (error) {
      next(error);
    }
  };

  getAccountById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const account = await this._accountService.getAccountById(req.params.id);
      res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.ACCOUNT_FETCHED,
        data: account,
      });
    } catch (error) {
      next(error);
    }
  };

  updateAccountById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const parseResult = updateAccountSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: MESSAGES.VALIDATION_FAILED,
          errors: parseResult.error.format(),
        });
        return;
      }
      const updateData = parseResult.data;
      const updatedAccount = await this._accountService.updateAccount(
        req.params.id,
        updateData
      );
      if (!updatedAccount) {
        res.status(STATUS_CODES.NOT_FOUND).json({
          success: false,
          message: MESSAGES.ACCOUNT_NOT_FOUND,
        });
        return;
      }
      res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.ACCOUNT_UPDATED,
        data: updatedAccount,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const accounts = await this._accountService.getAllAccounts();
      res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.ACCOUNTS_FETCHED,
        data: accounts,
      });
    } catch (error: any) {
      next(error);
    }
  };

  deleteAccountById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this._accountService.deleteAccount(id);

      res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.ACCOUNT_DELETED,
      });
    } catch (error) {
      next(error);
    }
  };
}
