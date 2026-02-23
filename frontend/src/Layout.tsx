import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/navigation/Navigation";
import { useAuth } from "@/lib/auth";

export function Layout() {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      
      {user && <Navigation />}

      <main className="grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* <footer className="bg-secondary text-text-muted py-4 text-center text-sm">
        &copy; 2026 Zoosino 
      </footer> */}
    </div>
  );
}