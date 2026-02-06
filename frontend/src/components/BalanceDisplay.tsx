export function BalanceDisplay({ amount }: { amount: number }) {
  return (
    <div className="flex items-center text-lg gap-2 px-3 py-1.5 border-primary/20">
      <span className="text-primary font-bold">$</span>
      <span className="text-text-main font-mono font-medium">
        {amount.toLocaleString()}
      </span>
    </div>
  );
}