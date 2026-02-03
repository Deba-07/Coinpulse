import Link from "next/link";

type Props = {
  title: string;
  coins: CoinMarketData[];
};

export default function TopMoversList({ title, coins }: Props) {
  return (
    <div className="details">
      <h4>{title}</h4>

      <ul className="details-grid">
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link
              href={`/coins/${coin.id}`}
              className="flex items-center gap-2"
            >
              <img src={coin.image} alt={coin.name} className="w-5 h-5" />

              <p className="font-medium">{coin.name}</p>
            </Link>

            <p
              className={`text-sm font-semibold ${
                coin.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
