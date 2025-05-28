import { IAccountRepository } from "../interfaces/IAccountRepository";
import { IDestinationRepository } from "../interfaces/IDestinationRepository";
import axios from "axios";
import { MESSAGES } from "../config/constants/messages";
import { STATUS_CODES } from "../config/constants/status-code";
import { CustomError } from "../utils/CustomError";

export class DataHandlerService {
  constructor(
    private accountRepo: IAccountRepository,
    private destinationRepo: IDestinationRepository
  ) {}

  public async processData(
    token: string,
    method: string,
    contentType: string | undefined,
    body: any
  ) {
    if (!token || token === "") {
        throw new CustomError(
      
        MESSAGES.UNAUTHORIZED ,
     STATUS_CODES.UNAUTHORIZED,
        );
    }

    if (method !== "POST") {
      throw new CustomError(MESSAGES.INVALID_DATA, STATUS_CODES.BAD_REQUEST);
    }

    const account = await this.accountRepo.findBySecretToken(token);
    if (!account) {
      return {
        status: STATUS_CODES.UNAUTHORIZED,
        message: MESSAGES.UNAUTHORIZED ,
      };
    }

    const destinations = await this.destinationRepo.findAllByAccount(
      account.id
    );

    if (destinations.length === 0) {
    throw new CustomError(MESSAGES.NO_DESTINATIONS,STATUS_CODES.NOT_FOUND)
     
    }

    for (const dest of destinations) {
      const headers = dest.headers || {};
      const url = dest.url;
      const httpMethod = dest.method.toLowerCase();

      try {
        if (httpMethod === "get") {
          await axios.get(url, { headers, params: body });
        } else if (httpMethod === "post") {
          await axios.post(url, body, { headers });
        } else if (httpMethod === "put") {
          await axios.put(url, body, { headers });
        }
      } catch (err) {
        console.error(`Failed to send data to ${url}:`,err);
      }
    }

  
  }
}
