import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const coin = searchParams.get("coin");

  if (!coin) {
    return NextResponse.json({ error: "Coin id missing" }, { status: 400 });
  }

  const url = `${process.env.COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${coin}`;

  const res = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
