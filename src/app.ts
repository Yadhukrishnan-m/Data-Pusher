import express, { Request, Response } from "express";
import { sequelize } from "./config/db.config";
import { AccountRoute } from "./routes/AccountRoute";
import dotenv from "dotenv";
import morgan from "morgan";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { DestinationRoute } from "./routes/DestinationRoute";
import { DataHandlerRoute } from "./routes/DataHandlerRoute";
dotenv.config();
const app = express();
const PORT: number = Number(process.env.PORT) || 5000;
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/accounts", AccountRoute);
app.use("/api/destinations", DestinationRoute);
app.use("/server", DataHandlerRoute);
app.use(ErrorHandler.handleError);

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced!");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    }); 
  } catch (error) {
    console.error("Unable to sync DB:", error);
  }
})();
