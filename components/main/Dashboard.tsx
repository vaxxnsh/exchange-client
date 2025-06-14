import { cryptoList, newStocks, popularStocks, topGainers } from "@/utils/constants"
import Image from "next/image"
import { CryptoTable } from "./CryptoTable"

const SmallContainer: React.FC<stockShowProps> = ({title, stockData}) => {
    return (
        <div className="bg-foreground rounded-lg shadow-xs w-full p-4 px-0">
            <div className="flex justify-between flex-row mb-2 items-baseline px-4">
                <p className="text-white font-medium">{title}</p>
            </div>
            {
                stockData.map((stock, index) => (
                    <a 
                        key={stock.stockName + index}
                        className="flex px-4 py-2 hover:bg-white/4"
                        href="#"
                    >
                        <span className="w-[40%]">
                            <div className="flex items-center flex-row min-w-max gap-2 w-full">
                                <div className="flex flex-row relative shrink-0">
                                    <Image 
                                        alt={`${stock.stockName} Logo`} 
                                        width={20} 
                                        height={20} 
                                        className="z-10 rounded-full" 
                                        src={stock.imgUrl}
                                        priority={index < 3}
                                    />
                                </div>
                                <p className="font-medium text-white text-nowrap text-sm">{stock.stockName}</p>
                            </div>
                        </span>
                        <span className="w-[30%]">
                            <p className="text-white font-medium text-right text-sm tabular-nums">${stock.curPrice}</p>
                        </span>
                        <span className="w-[30%]">
                            <p className={`font-medium text-right text-sm tabular-nums ${stock.status >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {stock.status > 0 ? '+'+stock.status : stock.status}%
                            </p>
                        </span>
                    </a>
                ))
            }
        </div>
    )
}



const Dashboard = () => {

  return (
    <div className="px-[10vw] my-5">
        <div className="w-full min-h-[220px] grid grid-cols-3 justify-between gap-4 items-center">
            <SmallContainer 
                title={newStocks.title} 
                stockData={newStocks.stockData}
            />
            <SmallContainer 
                title={topGainers.title} 
                stockData={topGainers.stockData}
            />
            <SmallContainer 
                title={popularStocks.title} 
                stockData={popularStocks.stockData}
            />
        </div>
        <CryptoTable cryptoData={cryptoList.slice(0,5)} />
    </div>
  )
}

export default Dashboard