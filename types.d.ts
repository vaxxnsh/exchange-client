interface NavLink {
    title : string
    redirect : string
    type : 'dropdown' | 'link'
}

type stockShowProps = {
    title : string;
    stockData : {
        curPrice : number,
        stockName : string,
        imgUrl : string,
        status : number,
    }[]
}

type CryptoData = {
  name: string;
  symbol: string;
  imgUrl ?: string;
  price: string;
  volume24h: string;
  marketCap: string;
  change24h: string;
  graph7d: string; 
};
interface Ticker {
    firstPrice: string,
    high : string,
    lastPrice : string,
    low : string,
    priceChange : string,
    priceChangePercent : string,
    quoteVolume : string,
    symbol : string,
    trades : string,
    volume : string
}

interface KLine {
    close: string;
    end: string;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    start: string;
    trades: string;
    volume: string;
}

interface Trade {
    id: number,
    isBuyerMaker: boolean,
    price: string,
    quantity: string,
    quoteQuantity: string,
    timestamp: number
}

interface Depth {
    bids: [string, string][],
    asks: [string, string][],
    lastUpdateId: string
}