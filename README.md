# CoinPulse

> Crypto screener app with a built-in high frequency terminal and dashboard

**Live URL:** [https://coinpulse.vercel.app](https://coinpulse.vercel.app)

---

## Overview

CoinPulse is a modern cryptocurrency screener and dashboard built with Next.js 16, React 19, and Tailwind CSS 4. It provides real-time market data, interactive candlestick charts, trending coins, category analytics, and a high-frequency terminal for live price updates. Data is sourced from CoinGecko and Binance APIs.

---

## Features

- **Live Crypto Prices:** Real-time price updates and OHLCV charts for top coins
- **Trending Coins:** See what's trending in the market
- **Categories Analytics:** Top categories with gainers, market cap, and volume
- **All Coins Table:** Paginated, sortable table of all coins with key stats
- **Coin Details:** Dedicated pages for each coin with price, chart, and stats
- **Converter:** Convert between coins and fiat instantly
- **Responsive UI:** Mobile-first, dark mode, and beautiful design
- **High Frequency Terminal:** Live price and trade updates via WebSocket

---

## Tech Stack

- [Next.js 16 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [lightweight-charts](https://tradingview.github.io/lightweight-charts/)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [Binance WebSocket API](https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams)

---

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or yarn dev / pnpm dev / bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

---

## Folder Structure

```
├── app/                # Next.js app directory (routing, pages, layouts)
│   ├── api/            # API routes (CoinGecko proxy)
│   ├── globals.css     # Global styles (Tailwind)
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # UI and feature components
│   ├── home/           # Home page sections (Trending, Categories, etc.)
│   ├── ui/             # Reusable UI primitives (Button, Table, etc.)
│   └── ...             # Feature components (Charts, Header, etc.)
├── hooks/              # Custom React hooks (WebSocket, polling)
├── lib/                # Utility functions and API logic
├── public/             # Static assets (logo, images)
├── constants.ts        # App-wide constants
├── type.d.ts           # TypeScript types
├── package.json        # Project metadata and scripts
└── ...
```

---

## Main Components & Hooks

- `CandleStickChart` – Interactive candlestick chart for price history
- `CoinHeader` – Coin info and stats header
- `CoinsPagination` – Paginated navigation for coins
- `Converter` – Crypto/fiat converter
- `DataTable` – Generic table component
- `Header` – App navigation bar
- `LiveDataWrapper` – Real-time data wrapper for live updates
- `useBinanceWebSocket` – Custom hook for Binance live data
- `useCoinGeckoPolling` – Custom hook for polling CoinGecko

---

## API & Data

- **CoinGecko API**: Used for fetching coins, trending, categories, and OHLC data
- **Binance WebSocket**: Used for high-frequency live price and trade updates

---

## Styling

- **Tailwind CSS 4**: Utility-first CSS framework
- **Custom themes**: Dark mode, custom color palette, and responsive design

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and open a Pull Request

---

## License

MIT
