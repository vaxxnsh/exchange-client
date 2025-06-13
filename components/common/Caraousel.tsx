"use client";
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { slides } from '@/utils/constants';



export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className='flex w-full items-center justify-center p-1.5'>
        <div className="relative w-[80vw] rounded-2xl bg-[#121519] h-[24rem] overflow-hidden">
            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                key={current}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
                >
                <Image
                    src={slides[current].image}
                    alt="carousel background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-start px-10 md:px-20 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{slides[current].heading}</h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-300 max-w-md">{slides[current].subheading}</p>
                    <button className="bg-white text-black text-[16px] px-6 py-3 rounded-lg font-semibold mb-10">
                        {slides[current].button}
                    </button>
                </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full"
            >
                <ChevronLeft className="text-white w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full"
            >
                <ChevronRight className="text-white w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full ${
                    idx === current ? 'bg-white' : 'bg-gray-600'
                    }`}
                ></button>
                ))}
            </div>
        </div>
    </div>
  );
}