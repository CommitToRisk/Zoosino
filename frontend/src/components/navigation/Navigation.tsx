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
    <nav className="bg-secondary shadow-sm border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-primary font-bold text-xl tracking-wider hover:text-primary-hover transition-colors shrink-0"
            >
              ZOOSINO
            </Link>

            <div className="hidden xl:flex items-center space-x-1">
              <NavigationLink routeTo="/turtlette" Name="Turtlette" />
              <NavigationLink routeTo="/pengjack" Name="PengJack" />
              <NavigationLink routeTo="/sloth" Name="Sloth" />
              <div className="w-px h-4 bg-border/40 mx-2"></div>
              <NavigationLink routeTo="/leaderboards" Name="Leaderboards" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block"> 
               <BalanceDisplay amount={user?.balance || 0} />
            </div>
            
            <div className="hidden xl:flex items-center gap-2">
              <NavigationLink routeTo="/account" Name="Account" />
              
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-2 text-sm font-medium text-text-muted hover:text-red-500 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Log Out
              </button>
            </div>

            <div className="xl:hidden flex items-center gap-4">
              <div className="sm:hidden">
                <BalanceDisplay amount={user?.balance || 0} />
              </div>
              <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden bg-secondary border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <NavigationLink
              routeTo="/"
              Name="Home"
              callback={() => setIsOpen(false)}
            />
            <NavigationLink
              routeTo="/turtlette"
              Name="Turtlette"
              callback={() => setIsOpen(false)}
            />
            <NavigationLink
              routeTo="/pengjack"
              Name="PengJack"
              callback={() => setIsOpen(false)}
            />
            <NavigationLink
              routeTo="/sloth"
              Name="Sloth"
              callback={() => setIsOpen(false)}
            />
            <NavigationLink
              routeTo="/leaderboards"
              Name="Leaderboards"
              callback={() => setIsOpen(false)}
            />
            
            <div className="border-t border-border/30 my-2"></div>

            <NavigationLink
              routeTo="/account"
              Name="Account"
              callback={() => setIsOpen(false)}
            />
            
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