import { Depth } from "@/components/main/depth/Depth";
import MarketBar from "@/components/main/MarketBar";
import { SwapUI } from "@/components/main/SwapUI";
import { TradeView } from "@/components/main/TradeView";

const page = async ({params} : {
    params : Promise<{market : string}>
}) => {

    const market = (await params).market;

    console.log(market);

  return (
    <div className="w-full h-[92vh] flex flex-row gap-2 px-4 overflow-hidden pb-4">
        <div className="w-[77%] h-full flex flex-col gap-2">
            <div className="bg-foreground w-full rounded-lg">
                <MarketBar market={market} />
            </div>
            <div className="w-full h-[90%] flex flex-row gap-2">
                <div className="w-[75%] h-full bg-foreground rounded-lg p-4">
                    <TradeView market={market} />
                </div>
                <div className="w-[25%] h-full bg-foreground rounded-lg">
                    <Depth market={market} />
                </div>
            </div>
        </div>
        <div className="bg-foreground  w-[23%] h-[70vh] rounded-lg">
            <SwapUI market={market}/>
        </div>
    </div>
  )
}

export default page