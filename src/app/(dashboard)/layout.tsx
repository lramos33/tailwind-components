export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-blue-950">
      <div className="flex w-80 justify-center bg-green-950 pt-10">sidebar</div>

      <div className="flex flex-1 flex-col">
        <header className="flex h-18 items-center justify-center bg-purple-100 dark:bg-purple-950">header</header>
        <div className="mx-auto flex w-full max-w-8xl flex-1 border border-red-500">{children}</div>
      </div>
    </div>
  );
}
