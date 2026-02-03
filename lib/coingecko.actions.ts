"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;

if (!BASE_URL) throw new Error("Missing CoinGecko base url");

export async function fetcher<T>(
  endpoint: string,
  params?: Record<string, any>,
  revalidate = 60,
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}${cleanEndpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  // console.log("Fetching:", url);

  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));

    throw new Error(
      `CoinGecko API Error: ${response.status}: ${
        errorBody.error || response.statusText
      }`,
    );
  }

  return response.json();
}
