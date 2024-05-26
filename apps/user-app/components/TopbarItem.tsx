"use client";

import { Topbar } from "@repo/ui/topbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function TopbarItem() {
  const session = useSession();
  const router = useRouter();

  const balance = { amount: 34 };
  console.log("balance: ", balance);
  return (
    <div>
      <Topbar
        user={session.data?.user}
        balance={balance.amount}
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
      />
    </div>
  );
}
