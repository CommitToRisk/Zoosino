import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { NavigationLink } from "@/components/navigation/NavigationLink";
import { MenuButton } from "@/components/navigation/MenuButton";
import { BalanceDisplay } from "@/components/BalanceDisplay";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-secondary shadow-sm border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              className="text-primary font-bold text-xl tracking-wider hover:text-primary-hover transition-colors shrink-0"
            >
              ZOOSINO
            </Link>
          </div>

          <div className="shrink-0 mx-4">
            <BalanceDisplay amount={user?.balance || 0} />
          </div>

          <div className="flex-1 flex justify-end items-center">
            <div className="hidden md:flex items-center space-x-2">
              <NavigationLink routeTo="/" Name="Home" />
              <NavigationLink routeTo="/rulette" Name="Turtlette" />
              <NavigationLink routeTo="/account" Name="Account" />
              
              <div className="h-6 w-px bg-border/50 mx-2"></div>
              
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium text-text-muted hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                Log Out
              </button>
            </div>

            <div className="md:hidden ml-4">
              <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <NavigationLink
              routeTo="/"
              Name="Home"
              callback={() => setIsOpen(false)}
            />
            <NavigationLink
              routeTo="/rulette"
              Name="Turtlette"
              callback={() => setIsOpen(false)}
            />
            <NavigationLink
              routeTo="/account"
              Name="Account"
              callback={() => setIsOpen(false)}
            />
            
            <div className="border-t border-border/30 my-2"></div>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-base font-medium text-text-muted hover:text-red-500 hover:bg-secondary-light/50 rounded-md transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}