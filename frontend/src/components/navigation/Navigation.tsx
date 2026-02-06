import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationLink } from "./NavigationLink";
import { MenuButton } from "./MenuButton";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-secondary shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <Link
              to="/"
              className="text-primary font-bold text-xl tracking-wider hover:text-primary-hover transition-colors"
            >
              ZOOSINO
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavigationLink routeTo="/" Name="Home" />
            <NavigationLink routeTo="/rulette" Name="Turtlette" />
            <NavigationLink routeTo="/account" Name="Account" />
          </div>

          <div className="md:hidden">
            <MenuButton
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
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
