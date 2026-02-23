import { BackToHome } from "@/components/navigation/BackToHome";
import { usePageTitle } from "@/hooks/usePageTitle";

export function NotFoundPage() {
  usePageTitle("404 Not Found");

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      <h1 className="text-6xl font-extrabold text-warning mb-2 tracking-tighter drop-shadow-sm">
        404
      </h1>

      <h2 className="text-3xl font-bold text-text-main mb-4">
        Page not found :(
      </h2>

      <p className="text-text-muted max-w-md mb-8 text-lg">
        Oops! It seems like you've wandered off the casino floor. The page you
        are looking for doesn't exist.
      </p>

      <BackToHome />
    </div>
  );
}
