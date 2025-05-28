import { Router } from "express";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountService } from "../services/AccountService";
import { AccountController } from "../controllers/AccountController";

// DI Setup
const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

const accountRoute = Router();

accountRoute.post("/", accountController.createAccount);
accountRoute.get("/:id", accountController.getAccountById);
accountRoute.patch("/:id", accountController.updateAccountById);
accountRoute.get("/", accountController.getAllAccounts);
accountRoute.delete("/:id", accountController.deleteAccountById);


export const AccountRoute = accountRoute;
