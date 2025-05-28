export interface IDestination {
  id: string;
  accountId: string;
  url: string;
  method: "GET" | "POST" | "PUT";
  headers: Record<string, string>;
}
