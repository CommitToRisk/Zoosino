import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { DisplayField } from "@/components/fields/DisplayField";
import { EditableField } from "@/components/fields/EditableField";
import { HiddenField } from "@/components/fields/HiddenField";


export function AccountPage() {
  const { user, updateDisplayName } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return <div className="text-center mt-20 text-text-main">Loading...</div>;

  const startEditing = () => {
    setNewName(user.displayName || "");
    setIsEditing(true);
  };

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    setIsSaving(true);
    try {
      if (updateDisplayName) await updateDisplayName(newName);
      setIsEditing(false);
    } catch (e) {
      alert("Error saving name");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around p-4">
      <div className="w-full max-w-md bg-secondary rounded-xl shadow-lg border border-border overflow-hidden">
        
        {isEditing ? (
          <EditableField 
            label="Display Name"
            value={newName}
            onChange={setNewName}
            onSave={handleSaveName}
            onCancel={() => setIsEditing(false)}
            isSaving={isSaving}
          />
        ) : (
          <DisplayField 
            label="Display Name" 
            value={user.displayName || "Unknown"} 
            action={
              <button 
                onClick={startEditing}
                className="text-text-muted hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              </button>
            }
          />
        )}

        <DisplayField 
          label="Current Balance" 
          value={`${user.balance ? user.balance : 0} Points`} 
        />

        <HiddenField 
          label="Login Phrase" 
          value={user.phrase || ""} 
        />
        
      </div>

      <div className="text-center mt-8">
        <Link 
          to="/login"
          className="inline-block border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg transition-all font-bold uppercase tracking-wider text-sm"
        >
          Change Account
        </Link>
      </div>
    </div>
  );
}