type EditableFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
};

export function EditableField({ label, value, onChange, onSave, onCancel, isSaving }: EditableFieldProps) {
  return (
    <div className="p-6 border-b border-border/50 last:border-0">
      <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-2">{label}</h3>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 rounded border border-border bg-background text-text-main"
          autoFocus
        />
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="bg-primary text-white px-4 py-2 rounded font-bold hover:bg-primary-hover disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}