import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { amount, type, description } = await request.json();

    /** Validate input */
    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!["CASH_IN", "CASH_OUT"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid transaction type" },
        { status: 400 }
      );
    }

    /** Get user's wallet */
    const wallet = await db.wallet.findUnique({
      where: { userId: session.user.id },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    /** Check balance for cash out */
    if (type === "CASH_OUT" && wallet.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    /** Create transaction */
    const transaction = await db.transaction.create({
      data: {
        amount,
        type,
        description,
        walletId: wallet.id,
      },
    });

    /** Update wallet balance */
    const newBalance =
      type === "CASH_IN" ? wallet.balance + amount : wallet.balance - amount;

    await db.wallet.update({
      where: { id: wallet.id },
      data: { balance: newBalance },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
