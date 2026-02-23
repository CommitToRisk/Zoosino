import { Link } from "react-router-dom";

interface NavigationLinkProps {
  routeTo: string;
  Name: string;
  callback?: () => void;
}

export function NavigationLink({
  routeTo,
  Name,
  callback,
}: NavigationLinkProps) {
  return (
    <Link
      to={routeTo}
      className="text-text-main hover:text-primary hover:bg-opacity-10 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200"
      onClick={callback}
    >
      {Name}
    </Link>
  );
}
