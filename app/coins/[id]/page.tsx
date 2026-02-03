import Converter from "@/components/Converter";
import LiveDataWrapper from "@/components/LiveDataWrapper";
import { toBinanceSymbol } from "@/lib/binance";
import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  // Fetch Coin Details + OHLC Chart Data
  const [coinData, coinOHLCData] = await Promise.all([
    fetcher<CoinDetailsData>(`/coins/${id}`),

    fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
      vs_currency: "usd",
      days: 1,
      precision: "full",
    }),
  ]);

  // Binance Symbol (Dynamic)
  const binanceSymbol = toBinanceSymbol(coinData.symbol);

  // Coin Details UI Data (unchanged)
  const coinDetails = [
    {
      label: "Market Cap",
      value: formatCurrency(coinData.market_data.market_cap.usd),
    },
    {
      label: "Market Cap Rank",
      value: `# ${coinData.market_cap_rank}`,
    },
    {
      label: "Total Volume",
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      label: "Website",
      value: "-",
      link: coinData.links.homepage[0],
      linkText: "Homepage",
    },
    {
      label: "Explorer",
      value: "-",
      link: coinData.links.blockchain_site[0],
      linkText: "Explorer",
    },
    {
      label: "Community",
      value: "-",
      link: coinData.links.subreddit_url,
      linkText: "Community",
    },
  ];

  return (
    <main id="coin-details-page">
      {/* Primary Section */}
      <section className="primary">
        <LiveDataWrapper
          coinId={id}
          coin={coinData}
          coinOHLCData={coinOHLCData}
          binanceSymbol={binanceSymbol}
        >
          <h4>Exchange Listings</h4>
        </LiveDataWrapper>
      </section>

      {/* Secondary Section */}
      <section className="secondary">
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        />

        <div className="details">
          <h4>Coin Details</h4>

          <ul className="details-grid">
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className={label}>{label}</p>

                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {linkText || label}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p>Top gainers and losers</p>
      </section>
    </main>
  );
};

export default page;
