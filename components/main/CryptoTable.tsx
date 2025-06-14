import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

type CryptoTableProps = {
  cryptoData: CryptoData[];
};

export const CryptoTable: React.FC<CryptoTableProps> = ({ cryptoData }) => {
  return (
    <div className="flex flex-col bg-foreground flex-1 gap-3 rounded-xl p-4 my-4">
      <div className="flex flex-row">
        <div className="items-center justify-center flex-row flex gap-2">
          <Link
            href="/spot" 
            className="flex justify-center flex-col cursor-pointer rounded-lg py-1 font-medium outline-hidden hover:opacity-90 text-gray-400 px-3 h-8 text-sm transition-opacity"
          >
            Spot
          </Link>
          <Link 
            href="/futures" 
            className="flex justify-center flex-col cursor-pointer rounded-lg py-1 font-medium outline-hidden hover:opacity-90 text-white px-3 h-8 text-sm bg-gray-800 transition-opacity"
          >
            Futures
          </Link>
          <Link 
            href="/lend" 
            className="flex justify-center flex-col cursor-pointer rounded-lg py-1 font-medium outline-hidden hover:opacity-90 text-gray-400 px-3 h-8 text-sm transition-opacity"
          >
            Lend
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-700 px-1 py-3 text-sm font-normal text-gray-400 first:pl-2 last:pr-6">
                <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-start text-left">
                  Name
                </div>
              </th>
              <th className="border-b border-gray-700 w-[17%] px-1 py-3 text-sm font-normal text-gray-400 first:pl-2 last:pr-6">
                <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  Price
                </div>
              </th>
              <th className="border-b border-gray-700 w-[17%] px-1 py-3 text-sm font-normal text-gray-400 first:pl-2 last:pr-6">
                <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  24h Volume
                </div>
              </th>
              <th className="border-b border-gray-700 w-[17%] px-1 py-3 text-sm font-normal text-gray-400 first:pl-2 last:pr-6">
                <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  Market Cap
                </div>
              </th>
              <th className="border-b border-gray-700 w-[17%] px-1 py-3 text-sm font-normal text-gray-400 first:pl-2 last:pr-6">
                <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  24h Change
                </div>
              </th>
              <th className="border-b border-gray-700 w-[17%] px-1 py-3 text-sm font-normal text-gray-400 first:pl-2 last:pr-6">
                <div className="flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  Last 7 Days
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="gap-2 divide-y divide-gray-700">
            {cryptoData.map((crypto, index) => (
              <tr key={`${crypto.symbol}-${index}`} className="group hover:bg-gray-800 cursor-pointer transition-colors">
                <td className="text-sm tabular-nums px-2 py-3 last:pr-7">
                  <Link 
                    href={`/crypto/${crypto.symbol.toLowerCase()}`} 
                    className="flex shrink whitespace-nowrap hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="relative flex-none overflow-hidden rounded-full border-gray-600 border" style={{width: '40px', height: '40px'}}>
                          <div className="relative">
                            <Image 
                              alt={`${crypto.name} (${crypto.symbol}) Logo`} 
                              width={40} 
                              height={40} 
                              className="object-cover" 
                              src={crypto.imgUrl ? crypto.imgUrl : '/icons/btc.webp'}
                              priority={index < 3}
                              sizes="40px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex flex-col">
                        <div className="flex items-center justify-start flex-row gap-2">
                          <div className="font-medium text-base text-white">{crypto.name}</div>
                          <div className="text-xs text-gray-400 uppercase">{crypto.symbol}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
                  <p className="text-base font-medium tabular-nums text-white">{crypto.price}</p>
                </td>
                <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
                  <p className="text-base font-medium tabular-nums text-white">{crypto.volume24h}</p>
                </td>
                <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
                  <p className="text-base font-medium tabular-nums text-white">{crypto.marketCap}</p>
                </td>
                <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
                  <p className={`text-base font-medium tabular-nums transition-colors ${
                    crypto.change24h.startsWith('+') || (!crypto.change24h.startsWith('-') && parseFloat(crypto.change24h) > 0)
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {crypto.change24h}
                  </p>
                </td>
                <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
                  <div className="align-center flex justify-end">
                    <div className="w-[100px] h-[20px] bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
                      Chart
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
