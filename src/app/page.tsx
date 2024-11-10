import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const avatarSize = 120;

  return (
    <main className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex space-x-8 items-center">
          <Image
            className="rounded-full"
            src="/joe-maffei.png"
            alt=""
            width={avatarSize}
            height={avatarSize}
          />
          <div className="flex flex-col space-y-4">
            <h1 className="text-5xl font-bold text-slate-700 dark:text-slate-200">
              Joe Maffei
            </h1>
            <nav className="flex gap-x-2 text-xl">
              <a href="https://joemaffei.dev">developer</a>
              <span className="text-slate-300 dark:text-slate-500">&bull;</span>
              <Link href="/music">musician</Link>
              <span className="text-slate-300 dark:text-slate-500">&bull;</span>
              <a href="https://www.instagram.com/joemaffei">foodie</a>
            </nav>
          </div>
        </div>
        <address className="not-italic flex gap-x-4 text-sm">
          <a href="https://bsky.app/profile/joemaffei.dev">bluesky</a>
          <a href="https://instagram.com/joemaffei">instagram</a>
          <a href="https://linkedin.com/in/joemaffei">linkedin</a>
          <a href="https://mastodon.online/@joemaffei">mastodon</a>
          <a href="https://reddit.com/user/joemaffei">reddit</a>
          <a href="https://threads.net/@joemaffei">threads</a>
          <a href="https://youtube.com/@joemaffei">youtube</a>
        </address>
      </div>
    </main>
  );
}
