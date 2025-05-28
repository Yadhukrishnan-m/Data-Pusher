import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

export class Account extends Model {
  declare id: string;
  declare email: string;
  declare name: string;
  declare secretToken: string;
  declare website?: string;
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secretToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Account",
  }
);
