"use client";

import { Topbar } from "@repo/ui/topbar";
import { useBalance } from "@repo/store/usebalance";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function TopbarItem() {
  const session = useSession();
  const router = useRouter();

  const balance = useBalance();

  return (
    <div>
      <Topbar
        user={session.data?.user}
        balance={balance}
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
      />
    </div>
  );
}
