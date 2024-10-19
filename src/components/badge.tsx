export function Badge({ children }: { readonly children: React.ReactNode }) {
  return <div className="whitespace-nowrap rounded-md border border-b-primary px-1.5 py-0.5 text-xs font-medium text-t-secondary">{children}</div>;
}
