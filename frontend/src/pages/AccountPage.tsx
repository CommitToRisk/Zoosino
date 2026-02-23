import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { DisplayField } from "@/components/form/DisplayField";
import { usePageTitle } from "@/hooks/usePageTitle";


export function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  usePageTitle("My Account");

  if (!user) return <div className="text-center mt-20 text-text-main animate-pulse">Loading profile...</div>;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-start pt-10 p-4 min-h-[80vh]">
      
      <h1 className="text-3xl font-bold text-primary mb-8">My Profile</h1>

      <div className="w-full max-w-md bg-secondary rounded-xl shadow-lg border border-border overflow-hidden">
        
        {user.isGuest && (
          <div className="bg-warning/10 border-b border-warning/20 p-4 text-center">
            <p className="text-warning font-bold mb-2 flex items-center justify-center gap-2">
              ⚠️ Guest Account
            </p>
            
            <p className="text-sm text-text-main mb-3">
              Your progress is not permanently saved. Register to keep your balance!
            </p>
            
            <Link 
              to="/register" 
              className="inline-block text-sm bg-warning hover:bg-warning-hover text-black/80 font-bold px-4 py-1.5 rounded transition-colors"
            >
              Upgrade to Full Account
            </Link>
          </div>
        )}

        <DisplayField 
          label="Username" 
          value={user.username} 
        />

        <DisplayField 
          label="Current Balance" 
          value={`${user.balance?.toLocaleString()} Credits`} 
        />
        
      </div>

      <div className="text-center mt-8 w-full max-w-md">
        <button 
          onClick={handleLogout}
          className="w-full border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg transition-all font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Log Out
        </button>
      </div>
      
    </div>
  );
}