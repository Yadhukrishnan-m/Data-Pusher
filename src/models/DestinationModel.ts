import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { Account } from "./AccountModel";

export class Destination extends Model {
  declare id: string;
  declare accountId: string;
  declare url: string;
  declare method: string;
  declare headers: object;
}

Destination.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Accounts",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Destination",
  }
);

// Associations
Account.hasMany(Destination, { foreignKey: "accountId", onDelete: "CASCADE" });
Destination.belongsTo(Account, { foreignKey: "accountId" });
