
type FormFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
};

export function FormField({label, type = 'text', value, onChange, placeholder = '', required = true}: FormFieldProps) {
   return (
    <label className="block mb-4">
      <div className="text-sm text-text-main mb-1">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded border border-border bg-background text-text-main"
        placeholder={placeholder}
        required={required}
      />
    </label>
   )
}
