"use client";

import clsx from "clsx";
import Link from "next/link";

import {UserAvatar} from "./user-avatar";

import useScroll from "@/hooks/use-scroll";

export function MarketingNav() {
  const scrolled = useScroll(80);

  return (
    <div
      className={clsx(
        `sticky inset-x-0 top-0 z-30 w-full transition-all bg-gray-100/50 dark:bg-gray-900/60 dark:border-gray-800`,
        {
          "border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/60 backdrop-blur-sm":
            scrolled,
        },
      )}
    >
      <div className={`mx-auto w-full max-w-screen-xl px-2.5 md:px-20`}>
        <div className="flex h-16 items-center justify-center">
          <Link className="flex items-center gap-4" href="/">
            <UserAvatar
              className="h-8 w-8"
              user={{
                name: null,
                image:
                  "https://lh3.googleusercontent.com/a/AAcHTtcX5_Oy9-jNzGcN8ImfofyzTwrxdopx2jUkNOfEGIY=s96-c" ||
                  null,
              }}
            />{" "}
            <p className="text-lg font-semibold">Guillermo trying coding</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
