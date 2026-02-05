import { useState } from "react";
import { Link } from "react-router-dom";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = "text-text-main hover:text-primary hover:bg-opacity-10 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200";

  return (
    <nav className="bg-secondary shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0">
            <Link to="/" className="text-primary font-bold text-xl tracking-wider hover:text-primary-hover transition-colors">
              ZOOSINO
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={linkStyle}>Home</Link>
            <Link to="/rulette" className={linkStyle}>Turtlette</Link>
            <Link to="/account" className={linkStyle}>Account</Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-text-muted hover:text-primary focus:outline-none p-2"
            >
              <span className="sr-only">Open Menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <Link 
              to="/" 
              className={linkStyle} 
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/rulette" 
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Turtlette
            </Link>
            
            <Link 
              to="/account" 
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}