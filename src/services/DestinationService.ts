import { IDestinationService } from "../interfaces/IDestinationService";
import { IDestination } from "../interfaces/IDestination";
import { IDestinationRepository } from "../interfaces/IDestinationRepository";
import { CustomError } from "../utils/CustomError";
import { MESSAGES } from "../config/constants/messages";
import { STATUS_CODES } from "../config/constants/status-code";
import { IAccountService } from "../interfaces/IAccountService";

export class DestinationService implements IDestinationService {
  constructor(
    private _repository: IDestinationRepository,
    private _accountService: IAccountService
  ) {}

  async create(
    accountId: string,
    data: Omit<IDestination, "id" | "accountId">
  ): Promise<IDestination> {
    const account = await this._accountService.getAccountById(accountId);
    if (!account) {
      throw new CustomError(MESSAGES.ACCOUNT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    const existing = await this._repository.findByAccountUrlAndMethod(
      accountId,
      data.url,
      data.method
    );

    const isDuplicate = existing.some(
      (dest: IDestination) =>
        JSON.stringify(dest.headers) === JSON.stringify(data.headers)
    );
    if (isDuplicate) {
      throw new CustomError(
        MESSAGES.DESTINATION_ALREADY_EXISTS,
        STATUS_CODES.CONFLICT
      );
    }

    return this._repository.create({ ...data, accountId });
  }

  async getById(id: string): Promise<IDestination> {
    const dest = await this._repository.findById(id);
    if (!dest)
      throw new CustomError(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
    return dest;
  }

  async update(id: string, data: Partial<IDestination>): Promise<IDestination> {
    const updated = await this._repository.update(id, data);
    if (!updated)
      throw new CustomError(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const dest = await this._repository.findById(id);
    if (!dest)
      throw new CustomError(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
    await this._repository.delete(id);
  }

  async getAllByAccount(accountId: string): Promise<IDestination[]> {
    const destinations:IDestination[] | null= await this._repository.findAllByAccount(accountId);

    if (!destinations) {
        throw new CustomError(MESSAGES.DESTINATION_NOT_FOUND,STATUS_CODES.NOT_FOUND)
    }
    if (!destinations.length) {
      throw new CustomError(
        MESSAGES.NO_DESTINATIONS,
        STATUS_CODES.NOT_FOUND
      );
    }
    return destinations
  }
}
