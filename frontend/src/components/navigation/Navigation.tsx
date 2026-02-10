import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationLink } from "./NavigationLink";
import { MenuButton } from "./MenuButton";
import { BalanceDisplay } from "../BalanceDisplay";
import { useAuth } from "../../lib/auth";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  return (
    <nav className="bg-secondary shadow-sm">
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
            <BalanceDisplay amount={0} />
          </div>

          <div className="flex-1 flex justify-end items-center">
            <div className="hidden md:flex items-center space-x-4">
              <NavigationLink routeTo="/" Name="Home" />
              <NavigationLink routeTo="/rulette" Name="Turtlette" />
              <NavigationLink routeTo="/account" Name="Account" />
              {!auth.user ? (
                <>
                  <NavigationLink routeTo="/login" Name="Login" />
                  <NavigationLink routeTo="/register" Name="Register" />
                </>
              ) : (
                <button
                  onClick={() => auth.logout()}
                  className="text-sm text-text-main px-3 py-1 rounded hover:bg-secondary-light"
                >
                  Logout
                </button>
              )}
            </div>

            <div className="md:hidden ml-4">
              <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-gray-700">
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
          </div>
        </div>
      )}
    </nav>
  );
}
