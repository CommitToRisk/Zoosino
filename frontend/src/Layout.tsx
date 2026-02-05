import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      
      <Navigation />

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-secondary text-text-muted py-4 text-center text-sm">
        &copy; 2026 Zoosino 
      </footer>
    </div>
  );
}