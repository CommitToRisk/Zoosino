type DisplayFieldProps = {
  label: string;
  value: string | number;
  action?: React.ReactNode;
  className?: string;
};

export function DisplayField({ label, value, action, className = "" }: DisplayFieldProps) {
  return (
    <div className={`p-6 border-b border-border/50 last:border-0 ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-md font-bold text-primary uppercase tracking-wider">{label}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="text-md text-text-main font-medium break-all">
        {value}
      </div>
    </div>
  );
}