import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <header className="flex justify-center">
        <div className="w-full flex items-center justify-between py-10">
          <div className="flex items-center gap-x-2">
            <Link href="/" className="text-2xl font-semibold">
              Joe Maffei
            </Link>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="text-slate-700 dark:text-slate-300">music</span>
          </div>
          <nav className="flex gap-x-4">
            <Link href="/music">calendar</Link>
            {/* <Link href="/music/bands">bands</Link> */}
            <a href="https://soundcloud.com/joemaffei" target="_blank">
              soundcloud
            </a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
