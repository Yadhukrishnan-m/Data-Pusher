import { IDestination } from "./IDestination";

export interface IDestinationService {
  create(accountId:string,data: Omit<IDestination, "id" | "accountId">): Promise<IDestination>;
  getById(id: string): Promise<IDestination>;
  update(id: string, data: Partial<IDestination>): Promise<IDestination>;
  delete(id: string): Promise<void>;
  getAllByAccount(accountId: string): Promise<IDestination[]>;
}
