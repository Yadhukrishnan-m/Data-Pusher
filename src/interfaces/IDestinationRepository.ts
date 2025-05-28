import { IDestination } from "./IDestination";

export interface IDestinationRepository {
  create(data: Omit<IDestination, "id">): Promise<IDestination>;
  findById(id: string): Promise<IDestination | null>;
  update(id: string, data: Partial<IDestination>): Promise<IDestination | null>;
  delete(id: string): Promise<void>;
  findAllByAccount(accountId: string): Promise<IDestination[]>;
  findByAccountUrlAndMethod(
    accountId: string,
    url: string,
    method: string
  ): Promise<IDestination[]>;
}
