// src/interfaces/IAccountService.ts
import { IAccount } from "./IAccount";

export interface IAccountService {
  createAccount(data: Omit<IAccount, "id" | "secretToken">): Promise<IAccount>;
  getAccountByEmail(email: string): Promise<IAccount | null>;
  getAccountById(id: string): Promise<IAccount | null>;
  updateAccount(id: string, data: Partial<IAccount>): Promise<IAccount>;
  deleteAccount(id: string): Promise<void>;
  getAllAccounts(): Promise<IAccount[]>;
}
