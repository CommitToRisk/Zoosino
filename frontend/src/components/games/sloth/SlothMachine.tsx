import treeUpperImg from "@/assets/sloth/tree_upper.svg";
import treeBottomImg from "@/assets/sloth/tree_bottom.svg";
import slothImg from "@/assets/sloth/sloth.png"; 

const FRUIT_COLORS = [
  "bg-red-500",
  "bg-yellow-400",
  "bg-green-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-pink-400",
  "bg-blue-400"
];

type SlothMachineProps = {
  fruits: number[] | null;
  isSpinning: boolean;
};

export function SlothMachine({ fruits, isSpinning }: SlothMachineProps) {
  const displayFruits = fruits || [-1, -1, -1];

  return (
    <div className="relative flex flex-col items-center w-full max-w-[320px] sm:max-w-100 mx-auto mt-16">
      
      <img 
        src={slothImg} 
        alt="Sleeping Sloth" 
        className="absolute z-40 -top-8 sm:-top-10 w-32 sm:w-40 drop-shadow-sm pointer-events-none" 
      />

      <img 
        src={treeUpperImg} 
        alt="Tree Upper" 
        className="relative z-30 w-full drop-shadow-xl pointer-events-none" 
      />

      <div className="absolute z-20 top-[35%] sm:top-[40%] flex justify-center gap-3 sm:gap-4 w-full">
        {displayFruits.map((fruitId, index) => {
          const isHidden = fruitId === -1;
          const colorClass = isHidden ? "bg-transparent border-transparent shadow-none" : FRUIT_COLORS[fruitId];

          return (
            <div 
              key={index}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 ${isHidden ? '' : 'border-black/10 shadow-lg'} transition-all duration-700 ease-bounce ${colorClass} ${
                isSpinning 
                  ? "-translate-y-20 opacity-0" 
                  : "translate-y-12 sm:translate-y-16 opacity-100"
              }`}
              style={{
                transitionDelay: isSpinning ? '0ms' : `${index * 150}ms`
              }}
            />
          );
        })}
      </div>

      <img 
        src={treeBottomImg} 
        alt="Tree Bottom" 
        className="relative z-10 w-full -mt-25 sm:-mt-32 pointer-events-none" 
      />

    </div>
  );
}