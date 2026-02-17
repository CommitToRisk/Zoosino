import { Link } from "react-router-dom";

export function BackToHome() {
  return (
    <div className="mt-8 text-center">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors group"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="group-hover:-translate-x-1 transition-transform"
        >
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
    </div>
  );
}