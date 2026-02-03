"use client";

import { useEffect, useRef, useState } from "react";

type Trade = {
  price: number;
  amount: number;
  value: number;
  timestamp: number;
  type: "b" | "s";
};

export function useBinanceWebSocket(symbol: string) {
  const [price, setPrice] = useState<number | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const bufferRef = useRef<Trade[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent StrictMode double-effect issue
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!symbol) return;

    // Ignore first StrictMode fake mount
    if (mountedRef.current) return;
    mountedRef.current = true;

    const lowerSymbol = symbol.toLowerCase();

    const base = process.env.NEXT_PUBLIC_BINANCE_WS_URL;
    if (!base) return;

    const wsUrl = `${base}/${lowerSymbol}@trade`;
    const ws = new WebSocket(wsUrl);

    setTrades([]);
    setPrice(null);

    ws.onopen = () => {
      console.log("✅ Binance WS Connected:", symbol);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const trade: Trade = {
        price: Number(data.p),
        amount: Number(data.q),
        value: Number(data.p) * Number(data.q),
        timestamp: data.T,
        type: data.m ? "s" : "b",
      };

      setPrice(trade.price);

      bufferRef.current.unshift(trade);

      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          setTrades((prev) => [...bufferRef.current, ...prev].slice(0, 7));

          bufferRef.current = [];
          timeoutRef.current = null;
        }, 1000);
      }
    };

    ws.onclose = () => {
      console.log("❌ Binance WS Disconnected:", symbol);
      setIsConnected(false);
    };

    ws.onerror = () => {
      console.log("⚠️ Binance WS unavailable for:", symbol);
      setIsConnected(false);
    };

    return () => {
      ws.close();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Reset mount flag on cleanup
      mountedRef.current = false;
    };
  }, [symbol]);

  return { price, trades, isConnected };
}
