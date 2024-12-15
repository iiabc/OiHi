import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export default function Home() {
  const textEffect = "mb-5 text-slate-600 dark:text-slate-600";

  const words = [
    {
      text: "每一个问题都值得关注",
      className: textEffect,
    },
    {
      text: "解答尽在其中",
      className: textEffect,
    }
  ]

  return (
    <>
      <main>
        <BackgroundLines className="flex h-screen flex-col justify-center text-center items-center z-0">
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4 z-10">
            <h1 className="text-6xl font-bold">Oi Hi</h1>
          </div>
          <TypewriterEffect words={words} />
          <p className="text-xl font-bold text-gray-500">头脑简单 😯</p>
          <Button className="mt-5 z-20" asChild>
            <Link href="/conversation">开始咨询</Link>
          </Button>
        </BackgroundLines>
      </main>
    </>
  );
}
