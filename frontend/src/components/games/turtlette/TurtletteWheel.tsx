import { useState, useEffect, useRef } from "react";
import wheelImg from "@/assets/wheel.png";

export const ROULETTE_ORDER = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

// 0 32 15 19 4 21 2 25 17 34 6 27 13 36 11 30 8 23 10 5 24 16 33 1 20 14 31 9 22 18 29 7 28 12 35 3 26

type TurtletteWheelProps = {
  rotationDeg: number;
  isZoomed: boolean;
  isSpinning: boolean;
  winningNumber: number | null;
};

export function TurtletteWheel({ rotationDeg, isZoomed, isSpinning, winningNumber }: TurtletteWheelProps) {
  const [centerDisplay, setCenterDisplay] = useState<number | string>("🐢");
  const wheelRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isSpinning) {
      setCenterDisplay(winningNumber !== null ? winningNumber : "0");
      return;
    }

    let animationFrameId: number;

    const trackRotation = () => {
      if (wheelRef.current) {
        const style = window.getComputedStyle(wheelRef.current);
        const transform = style.getPropertyValue("transform");

        if (transform !== "none") {
          const values = transform.split('(')[1].split(')')[0].split(',');
          const a = parseFloat(values[0]);
          const b = parseFloat(values[1]);
          
          let currentAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
          if (currentAngle < 0) currentAngle += 360;

          const sliceAngle = 360 / 37;
          const hitAngle = (180 - currentAngle + 360) % 360;
          
          const currentIndex = Math.floor(((hitAngle + sliceAngle / 2) % 360) / sliceAngle);
          const currentNumber = ROULETTE_ORDER[currentIndex];
          
          setCenterDisplay((prev) => prev !== currentNumber ? currentNumber : prev);
        }
      }
      
      animationFrameId = requestAnimationFrame(trackRotation);
    };

    animationFrameId = requestAnimationFrame(trackRotation);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isSpinning, winningNumber]);

  return (
    <div className="relative flex flex-col items-center justify-center shrink-0 min-h-62.5 w-full max-w-75">
      
      <div 
        className={`fixed inset-0 bg-background/90 backdrop-blur-sm z-40 transition-opacity duration-700 ${
          isZoomed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
      />
      
      <div 
        className={`relative z-50 flex flex-col items-center transition-all duration-700 ease-in-out ${
          isZoomed ? "scale-[1.6] sm:scale-[2] -translate-y-10 sm:-translate-y-16" : "scale-100 translate-y-0"
        }`}
      >
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full shadow-xl flex items-center justify-center">
          
          <img 
            ref={wheelRef}
            src={wheelImg} 
            alt="Roulette Wheel"
            className="absolute inset-0 w-full h-full object-cover rounded-full transition-transform duration-4000 ease-out"
            style={{ transform: `rotate(${rotationDeg}deg)` }}
          />
          
          <span className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-background text-text-main text-2xl sm:text-4xl font-black rounded-full shadow-[inset_0_3px_10px_rgba(0,0,0,0.2)] border-4 border-secondary/50">
            {centerDisplay}
          </span>

        </div>

        <div className={`text-3xl sm:text-4xl mt-1 ${isZoomed ? 'animate-bounce' : ''} relative z-50`}>
          🐢
        </div>
        <div className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm bg-background/80 px-2 rounded backdrop-blur mt-1 relative z-50">
          Turtley
        </div>
      </div>
    </div>
  );
}