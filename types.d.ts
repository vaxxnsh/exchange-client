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