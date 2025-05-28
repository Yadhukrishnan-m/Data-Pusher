import { IAccount } from "./IAccount";

export interface IAccountRepository {
  create(account: Omit<IAccount, "id">): Promise<IAccount>;
  findByEmail(email: string): Promise<IAccount | null>;
  findById(id: string): Promise<IAccount | null>;
  findBySecretToken(token: string): Promise<IAccount | null>;
  update(id: string, data: Partial<IAccount>): Promise<IAccount | null>;
  delete(id: string): Promise<void>;
}
