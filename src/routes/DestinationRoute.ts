import { Router } from "express";
import { DestinationRepository } from "../repositories/DestinationRepository";
import { DestinationService } from "../services/DestinationService";
import { DestinationController } from "../controllers/DestinationController";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountService } from "../services/AccountService";

const destinationRepo = new DestinationRepository();
const accountRepo = new AccountRepository();
const accountService = new AccountService(accountRepo);

const service = new DestinationService(destinationRepo, accountService);
const controller = new DestinationController(service);

const router = Router();

router.post("/:accountId", controller.create);
router.get("/:id", controller.getById);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);
router.get("/account/:accountId", controller.getByAccountId);

export const DestinationRoute = router;
