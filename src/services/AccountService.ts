import { IAccountService } from "../interfaces/IAccountService";
import { IAccount } from "../interfaces/IAccount";
import { AccountRepository } from "../repositories/AccountRepository";
import { generateSecretToken } from "../utils/GenerateSecretToken";
import { CustomError } from "../utils/CustomError";
import { MESSAGES } from "../config/constants/messages";
import { STATUS_CODES } from "../config/constants/status-code";
export class AccountService implements IAccountService {
  private _repository: AccountRepository;

  constructor(repository: AccountRepository) {
    this._repository = repository;
  }

  async createAccount(
    data: Omit<IAccount, "id" | "secretToken">
  ): Promise<IAccount> {
    const existing = await this._repository.findByEmail(data.email);
    if (existing)
      throw new CustomError(
        MESSAGES.EMAIL_ALREADY_EXISTS,
        STATUS_CODES.CONFLICT
      );
    const secretToken = generateSecretToken();
    return this._repository.create({ ...data, secretToken });
  }
  async getAccountByEmail(email: string): Promise<IAccount | null> {
    return this._repository.findByEmail(email);
  }
  async getAccountById(id: string): Promise<IAccount | null> {
    const Account: IAccount | null = await this._repository.findById(id);
    if (!Account) {
      throw new CustomError(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    return Account;
  }

  async updateAccount(id: string, data: Partial<IAccount>): Promise<IAccount> {
    const updated = await this._repository.update(id, data);
    if (!updated) {
      throw new CustomError(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    return updated;
  }

  async deleteAccount(id: string): Promise<void> {
    const account = await this._repository.findById(id);
    if (!account) {
      throw new CustomError(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    await this._repository.delete(id);
  }

  async getAllAccounts(): Promise<IAccount[]> {
    return this._repository.findAll();
  }
}
