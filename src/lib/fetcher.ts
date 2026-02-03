import { z } from "zod";

export class ApiError extends Error {
  status: number;
  body?: string;

  constructor(message: string, status: number, body?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  input: RequestInfo | URL,
  schema: z.ZodType<T>,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.headers ?? {})
    }
  });

  if (!res.ok) {
    const body = await res.text();
    throw new ApiError(`Request failed (${res.status})`, res.status, body);
  }

  const json = await res.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid API response");
  }

  return parsed.data;
}

export function jsonBody<T>(data: T): RequestInit {
  return {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
}
