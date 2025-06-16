
export const BidTable = ({ bids }: {bids: [string, string][]}) => {
    let currentTotal = 0; 
    const relevantBids = bids.slice(0, 15);
    console.log(relevantBids)
    const bidsWithTotal: [string, string, number][] = relevantBids.map(([price, quantity]) => [price, quantity, currentTotal += Number(quantity)]);
    const maxTotal = relevantBids.reduce((acc, [, quantity]) => acc + Number(quantity), 0);

    return <div>
        {bidsWithTotal?.map(([price, quantity, total]) => 
            <Bid 
                maxTotal={maxTotal} 
                total={total} 
                key={price} 
                price={price} 
                quantity={quantity} 
            />
        )}
    </div>
}

function Bid({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
    return (
        <div
            style={{
                display: "flex",
                position: "relative",
                width: "100%",
                backgroundColor: "transparent",
                overflow: "hidden",
            }}
        >
        <div
            style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${(100 * total) / maxTotal}%`,
            height: "100%",
            background: "rgba(1, 167, 129, 0.325)",
            transition: "width 0.3s ease-in-out",
            }}
        ></div>
            <div className={`flex justify-between text-white text-xs w-full`}>
                <span>
                    {price}
                </span>
                <span>
                    {quantity}
                </span>
                <span>
                    {total.toFixed(2)}
                </span>
            </div>
        </div>
    );
}
