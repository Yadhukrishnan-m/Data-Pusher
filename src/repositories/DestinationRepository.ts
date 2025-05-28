import { Destination } from "../models/DestinationModel";
import { IDestination } from "../interfaces/IDestination";
import { IDestinationRepository } from "../interfaces/IDestinationRepository";

export class DestinationRepository implements IDestinationRepository {
  async create(data: Omit<IDestination, "id">): Promise<IDestination> {
    const dest = await Destination.create(data);
    return dest.toJSON() as IDestination;
  }

  async findById(id: string): Promise<IDestination | null> {
    const dest = await Destination.findByPk(id);
    return dest ? (dest.toJSON() as IDestination) : null;
  }

  async update(
    id: string,
    data: Partial<IDestination>
  ): Promise<IDestination | null> {
    const dest = await Destination.findByPk(id);
    if (!dest) return null;
    await dest.update(data);
    return dest.toJSON() as IDestination;
  }

  async delete(id: string): Promise<void> {
    const dest = await Destination.findByPk(id);
    if (!dest) throw new Error("Destination not found");
    await dest.destroy();
  }
  async findByAccountUrlAndMethod(
    accountId: string,
    url: string,
    method: string
  ): Promise<IDestination[]> {
    const destinations = await Destination.findAll({
      where: { accountId, url, method },
    });
    return destinations.map((d) => d.toJSON() as IDestination);
  }
  async findAllByAccount(accountId: string): Promise<IDestination[]> {
    const destinations = await Destination.findAll({ where: { accountId } });
    return destinations.map((d) => d.toJSON() as IDestination);
  }
}
