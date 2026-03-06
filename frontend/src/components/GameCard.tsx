import { Link } from "react-router-dom";

type GameCardProps = {
  title: string;
  description: string;
  imgSrc: string;
  linkTo: string;
};

export function GameCard({ title, description, imgSrc, linkTo }: GameCardProps) {
  return (
  <div className="relative overflow-hidden bg-background border-2 border-border rounded-xl flex flex-col min-h-70 transition-all hover:-translate-y-2 group">
    
    <div className="flex-1 w-full p-4 flex items-center justify-center">
      <img 
        src={imgSrc} 
        alt={title} 
        className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-all opacity-90 backdrop-blur-sm" 
      />
    </div>

    <div className="p-5 w-full flex flex-col items-center text-center mt-auto bg-secondary border-t border-border/30">
      <h3 className="text-xl font-black text-text-main mb-1.5 uppercase tracking-wider">
        {title}
      </h3>
      
      <p className="text-text-muted text-xs mb-5 drop-shadow-md">
        {description}
      </p>
      
      <Link 
        to={linkTo} 
        className="w-full py-2.5 bg-primary text-text-secondary font-black text-sm rounded-lg hover:bg-primary-hover active:scale-95 transition-transform"
      >
        PLAY NOW
      </Link>
    </div>
    
  </div>
);
}