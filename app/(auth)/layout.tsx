
import Navbar from '@/components/common/Navbar';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='page'>
        <Navbar/>
        <div className="absolute top-1/2 left-1/2 my-auto h-full w-full max-w-[1280px] -translate-x-1/2 -translate-y-1/2">
            <Image 
                alt="Grid" 
                src="/backgrounds/grid-background.svg" 
                fill
                className="opacity-10"
            />
            <Image 
                alt="Candlesticks" 
                src="/backgrounds/candlestick-chart.svg" 
                fill
                className="opacity-10"
            />
            <div className="flex h-full w-full z-10">
                <div className="from-base-background-l0 h-full w-1/2 bg-gradient-to-r to-transparent opacity-80"></div>
                <div className="from-base-background-l0 h-full w-1/2 bg-gradient-to-l to-transparent opacity-80"></div>
            </div>
           
        </div>
         {children}
    </div>
  );
}