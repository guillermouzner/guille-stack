"use client";

import * as React from "react";
import {useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";
// import * as z from "zod";

import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <button
        className={cn(buttonVariants({variant: "outline"}))}
        disabled={isGoogleLoading}
        type="button"
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google", {
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/dashboard",
          });
        }}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  );
}
