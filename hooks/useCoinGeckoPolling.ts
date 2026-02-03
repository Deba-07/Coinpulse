"use client";

import { useEffect, useState } from "react";

export function useCoinGeckoPolling(coinId: string) {
  const [marketData, setMarketData] = useState<any>(null);

  useEffect(() => {
    if (!coinId) return;

    async function fetchMarket() {
      const res = await fetch(`/api/coingecko/markets?coin=${coinId}`);
      const data = await res.json();
      setMarketData(data[0]);
    }

    fetchMarket();

    const interval = setInterval(fetchMarket, 15000);

    return () => clearInterval(interval);
  }, [coinId]);

  return marketData;
}
