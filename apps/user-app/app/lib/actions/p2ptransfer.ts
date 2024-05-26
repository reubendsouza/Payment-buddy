"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(transferTo: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const transferFrom = session.user.id;

    const [transferToUser, fromUserBalance] = await Promise.all([
      prisma.user.findFirst({
        where: {
          number: transferTo,
        },
      }),
      await prisma.balance.findUnique({
        where: {
          userId: Number(transferFrom),
        },
      }),
    ]);

    if (!transferToUser) {
      throw new Error("Incorrect user");
    }
    if ((fromUserBalance?.amount ?? 0) < amount) {
      throw new Error("Low balance");
    }
    await Promise.all([
      prisma.balance.update({
        where: { userId: Number(transferFrom) },
        data: { amount: { decrement: amount } },
      }),
      prisma.balance.upsert({
        where: { userId: transferToUser.id },
        update: { amount: { increment: amount } },
        create: { userId: transferToUser.id, amount, locked: 0 },
      }),
    ]);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
