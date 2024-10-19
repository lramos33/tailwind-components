export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh">
      <div className="hidden w-80 justify-center bg-green-950/50 pt-10 lg:flex">sidebar</div>

      <div className="flex flex-1 flex-col">
        <header className="flex h-18 items-center justify-center bg-purple-100 dark:bg-purple-950/50">header</header>
        <div className="mx-auto flex w-full max-w-8xl flex-1 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
