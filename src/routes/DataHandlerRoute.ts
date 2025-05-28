import { Router } from "express";
import { DataHandlerController } from "../controllers/DataHandlerController";
import { DataHandlerService } from "../services/DataHandlerService";
import { AccountRepository } from "../repositories/AccountRepository";
import { DestinationRepository } from "../repositories/DestinationRepository";
const accountRepo = new AccountRepository();
const destinationRepo = new DestinationRepository();
const service = new DataHandlerService(accountRepo, destinationRepo);
const controller = new DataHandlerController(service);

const router = Router();

router.post("/incoming_data", controller.handleIncomingData);
router.get("/incoming_data", controller.handleIncomingData);


export const DataHandlerRoute = router;
