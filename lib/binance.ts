export const connectBinanceWS = (
  symbol: string,
  onMessage: (msg: any) => void,
  onOpen?: () => void,
  onClose?: () => void,
) => {
  const ws = new WebSocket(
    `${process.env.NEXT_PUBLIC_BINANCE_WS_URL}/${symbol.toLowerCase()}@trade/${symbol.toLowerCase()}@kline_1m`,
  );

  ws.onopen = onOpen ?? null;
  ws.onclose = onClose ?? null;
  ws.onerror = onClose ?? null;
  ws.onmessage = (e) => onMessage(JSON.parse(e.data));

  return ws;
};

export function toBinanceSymbol(symbol: string) {
  return `${symbol.toLowerCase()}usdt`;
}
