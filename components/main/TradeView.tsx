'use client';

import { ChartManager } from "@/utils/ChartManager";
import { getKlines } from "@/utils/httpClient";
import { useEffect, useRef } from "react";

export function TradeView({
  market,
}: {
  market: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);



  useEffect(() => {
      const init = async () => {
        let klineData: KLine[] = [];
        try {
          klineData = await getKlines(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000)); 

        } 
        catch (e : unknown) {
            console.log(e)
        }

        if (chartRef) {
          if (chartManagerRef.current) {
            chartManagerRef.current.destroy();
          }
          const chartManager = new ChartManager(
            (chartRef?.current as HTMLElement),
            [
              ...klineData?.map((x) => ({
                close: parseFloat(x.close),
                high: parseFloat(x.high),
                low: parseFloat(x.low),
                open: parseFloat(x.open),
                timestamp: new Date(x.end).getTime(), 
              })),
            ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
            {
              background: "#0e0f14",
              color: "white",
            }
          );
          chartManagerRef.current = chartManager;
        }
      };
      init();
  }, [market, chartRef]);

  return (
    <>
      <div ref={chartRef} style={{ height: "100%", width: "100%" }}></div>
    </>
  );
}