"use client";

import { ChevronDown } from "lucide-react";
import { getTicker } from "@/utils/httpClient";
import { formatPercentage, formatPrice, formatSymbol, formatVolume, getBaseCurrency } from "@/utils/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SignalingManager } from "@/utils/SignalingManager";

const MarketBar = ({ market }: { market: string }) => {
    const [ticker,setTicker] = useState<Ticker | null>(null);
 
    useEffect(() => {
        getTicker(market).then(setTicker);
        SignalingManager.getInstance().registerCallback("ticker", (data: Partial<Ticker>)  =>  setTicker(prevTicker => ({
            firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? '',
            high: data?.high ?? prevTicker?.high ?? '',
            lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? '',
            low: data?.low ?? prevTicker?.low ?? '',
            priceChange: data?.priceChange ?? prevTicker?.priceChange ?? '',
            priceChangePercent: data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? '',
            quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? '',
            symbol: data?.symbol ?? prevTicker?.symbol ?? '',
            trades: data?.trades ?? prevTicker?.trades ?? '',
            volume: data?.volume ?? prevTicker?.volume ?? '',
        })), `TICKER-${market}`);
        SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`ticker.${market}`]}	);

        return () => {
            SignalingManager.getInstance().deRegisterCallback("ticker", `TICKER-${market}`);
            SignalingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`ticker.${market}`]});
        }
    }, [market])

    if (!ticker) {
        return (
            <div className="flex items-center h-[72px] w-full bg-gray-900 px-4">
                <p className="text-gray-400">Unable to load market data</p>
            </div>
        );
    }

    return (
        <div className="flex items-center flex-row h-[72px] w-full overflow-auto pl-4 bg-transparent">
            <div className="flex justify-between flex-row w-full gap-4">
                <div className="flex flex-row shrink-0 gap-8">
                    <button
                        type="button"
                        className="flex items-center justify-between flex-row bg-overfore cursor-pointer rounded-xl px-2 hover:opacity-90 transition-opacity"
                    >
                        <div className="flex flex-row mr-2">
                            <div className="flex items-center flex-row min-w-max gap-2">
                                <div className="flex flex-row relative shrink-0">
                                    <Image
                                        src={`/icons/btc.webp`}
                                        width={25}
                                        height={25} 
                                        alt='currency_logo'
                                    />
                                </div>
                                <p className="font-medium text-white text-nowrap">
                                    {getBaseCurrency(ticker.symbol)}
                                    <span className="text-gray-400">/{formatSymbol(ticker.symbol).split('/')[1]}</span>
                                </p>
                            </div>
                        </div>
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                    </button>

                    <div className="flex items-center flex-row flex-wrap gap-x-6">
                        <div className="flex flex-col h-full justify-center">
                            <button
                                type="button"
                                className="cursor-help text-left"
                            >
                                <p className={`font-medium text-lg tabular-nums ${
                                    parseFloat(ticker.priceChange) >= 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {formatPrice(ticker.lastPrice)}
                                </p>
                            </button>
                            <p className="text-white text-left text-sm font-normal tabular-nums">
                                ${formatPrice(ticker.lastPrice)}
                            </p>
                        </div>

                        <div className="flex justify-center flex-col relative">
                            <p className="font-medium text-gray-400 text-xs">24H Change</p>
                            <span className={`mt-1 text-sm leading-4 font-normal tabular-nums ${
                                parseFloat(ticker.priceChange) >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {parseFloat(ticker.priceChange) >= 0 ? '+' : ''}{formatPrice(ticker.priceChange)} {formatPercentage(ticker.priceChangePercent)}
                            </span>
                        </div>

                        <div className="flex justify-center flex-col relative">
                            <p className="font-medium text-gray-400 text-xs">24H High</p>
                            <span className="text-white mt-1 text-sm leading-4 font-normal tabular-nums">
                                {formatPrice(ticker.high)}
                            </span>
                        </div>

                        <div className="flex justify-center flex-col relative">
                            <p className="font-medium text-gray-400 text-xs">24H Low</p>
                            <span className="text-white mt-1 text-sm leading-4 font-normal tabular-nums">
                                {formatPrice(ticker.low)}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="font-medium transition-opacity hover:cursor-pointer hover:opacity-80 text-blue-400 text-base text-left"
                        >
                            <div className="flex justify-center flex-col relative">
                                <p className="font-medium text-gray-400 text-xs">24H Volume (USD)</p>
                                <span className="text-white mt-1 text-sm leading-4 font-normal tabular-nums">
                                    {formatVolume(ticker.quoteVolume)}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketBar;