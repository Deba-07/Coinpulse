"use client";

import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/DataTable";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { useState } from "react";

import { useBinanceWebSocket } from "@/hooks/useBinanceWebSocket";
import { useCoinGeckoPolling } from "@/hooks/useCoinGeckoPolling";
import CandleStickChart from "./CandleStickChart";
import CoinHeader from "./CoinHeader";

const LiveDataWrapper = ({ coinId, coin, coinOHLCData }: LiveDataProps) => {
  const [liveInterval, setLiveInterval] = useState<"1s" | "1m">("1s");

  // Binance symbol (hardcoded for now)
  const binanceSymbol = `${coin.symbol.toLowerCase()}usdt`;

  // CoinGecko snapshot polling
  const marketData = useCoinGeckoPolling(coinId);

  // Binance real-time stream
  const { price, trades, isConnected } = useBinanceWebSocket(binanceSymbol);

  const tradeColumns: DataTableColumn<Trade>[] = [
    {
      header: "Price",
      cell: (trade) => (trade.price ? formatCurrency(trade.price) : "-"),
    },
    {
      header: "Amount",
      cell: (trade) => trade.amount?.toFixed(4) ?? "-",
    },
    {
      header: "Value",
      cell: (trade) => (trade.value ? formatCurrency(trade.value) : "-"),
    },
    {
      header: "Buy/Sell",
      cell: (trade) => (
        <span
          className={trade.type === "b" ? "text-green-500" : "text-red-500"}
        >
          {trade.type === "b" ? "Buy" : "Sell"}
        </span>
      ),
    },
    {
      header: "Time",
      cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : "-"),
    },
  ];

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={price ?? coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />

      <Separator className="divider" />

      <div className="trend">
        <CandleStickChart
          coinId={coinId}
          data={coinOHLCData}
          liveOhlcv={null}
          mode="live"
          initialPeriod="daily"
          liveInterval={liveInterval}
          setLiveInterval={setLiveInterval}
        >
          <h4>Trend Overview</h4>
        </CandleStickChart>
      </div>

      <Separator className="divider" />

      {tradeColumns && (
        <div className="trades">
          <h4>Recent Trades</h4>

          <DataTable
            columns={tradeColumns}
            data={trades}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      )}
    </section>
  );
};

export default LiveDataWrapper;
