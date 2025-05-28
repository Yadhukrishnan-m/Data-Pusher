import crypto from "crypto";

export function generateSecretToken(length = 64): string {
  return crypto.randomBytes(length).toString("hex");
}
 