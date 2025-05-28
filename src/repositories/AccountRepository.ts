import { IAccountRepository } from "../interfaces/IAccountRepository";
import { IAccount } from "../interfaces/IAccount";
import { Account } from "../models/AccountModel";
import { CustomError } from "../utils/CustomError";
import { MESSAGES } from "../config/constants/messages";
import { STATUS_CODES } from "../config/constants/status-code";

export class AccountRepository implements IAccountRepository {
  async create(accountData: Omit<IAccount, "id">): Promise<IAccount> {
    const account = await Account.create(accountData);
    return account.toJSON() as IAccount;
  }

  async findByEmail(email: string): Promise<IAccount | null> {
    const account = await Account.findOne({ where: { email } });
    return account ? (account.toJSON() as IAccount) : null;
  }

  async findById(id: string): Promise<IAccount | null> {
    const account = await Account.findByPk(id);
    return account ? (account.toJSON() as IAccount) : null;
  }

  async findBySecretToken(token: string): Promise<IAccount | null> {
    const account = await Account.findOne({ where: { secretToken: token } });
    return account ? (account.toJSON() as IAccount) : null;
  }

  async update(id: string, data: Partial<IAccount>): Promise<IAccount | null> {
    const account = await Account.findByPk(id);
    if (!account) return null;
    await account.update(data);
    return account.toJSON() as IAccount;
  }

  async delete(id: string): Promise<void> {
    const account = await Account.findByPk(id);
    if (!account) throw new Error("Account not found");
    await account.destroy();
  }

  async findAll(): Promise<IAccount[]> {
    const accounts = await Account.findAll();
    return accounts.map((account) => account.toJSON() as IAccount);
  }
}
