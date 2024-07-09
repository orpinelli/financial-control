import { env } from "@/env";

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_URL;
  const apiPreFix = '/api';
  const url = new URL(apiPreFix.concat(path), baseUrl);

  return fetch(url, init);
}
