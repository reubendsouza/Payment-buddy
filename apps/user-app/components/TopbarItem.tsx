"use client";

import { Topbar } from "@repo/ui/topbar";
import { useBalance } from "@repo/store/usebalance";

export function TopbarItem() {
  const balance = useBalance();
  return (
    <div>
      <Topbar balance={balance} />
    </div>
  );
}
