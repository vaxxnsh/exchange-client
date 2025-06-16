import axios from "axios";

const BASE_URL =  process.env.BASE_URL || "http://localhost:8080";

export async function getTicker(market: string): Promise<Ticker> {
    const tickers = await getTickers();
    const ticker = tickers.find(t => t.symbol === market);
    
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [{
        "firstPrice": "272.97",
        "high": "290.7",
        "lastPrice": "287.89",
        "low": "267.31",
        "priceChange": "14.92",
        "priceChangePercent": "0.054658",
        "quoteVolume": "14392.88424",
        "symbol": "BTC_USDC",
        "trades": "108",
        "volume": "50.728"
    }]
}


export async function getDepth(market: string): Promise<Depth> {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    return response.data;
}
export async function getTrades(market: string): Promise<Trade[]> {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
    return response.data;
}

export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}

export async function getMarkets(): Promise<string[]> {
    const response = await axios.get(`${BASE_URL}/markets`);
    return response.data;
}