import { Link } from "react-router-dom";

type GameCardProps = {
  title: string;
  description: string;
  imgSrc: string;
  linkTo: string;
};

export function GameCard({
  title,
  description,
  imgSrc,
  linkTo,
}: GameCardProps) {
  return (
    <div className="relative overflow-hidden bg-background border-2 border-border rounded-xl flex flex-col w-full max-w-87.5  mx-auto transition-all hover:-translate-y-2 group">
      <div className="h-45 w-full p-4 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={title}
          width="250"
          height="150"
          className="max-w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-all opacity-90 backdrop-blur-sm drop-shadow-md"
        />
      </div>

      <div className="flex-1 p-5 w-full flex flex-col items-center justify-between text-center bg-secondary border-t border-border/30">
        <div className="w-full">
          <h3 className="text-xl font-black text-text-main mb-2 uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-text-muted text-xs drop-shadow-md line-clamp-2 px-2">
            {description}
          </p>
        </div>

        <Link
          to={linkTo}
          className="w-full py-2.5 mt-4 bg-primary text-text-secondary font-black text-sm rounded-lg hover:bg-primary-hover active:scale-95 transition-transform"
        >
          PLAY NOW
        </Link>
      </div>
    </div>
  );
}
