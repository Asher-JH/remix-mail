import { json } from "@remix-run/node";

// Remix bad request
export const badRequest = (data: unknown) =>
  json(data, {
    status: 400,
  });
