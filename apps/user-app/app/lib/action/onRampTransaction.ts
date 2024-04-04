import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string,) {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user?.id) {
        return {
            message: "Unauthentiated request"
        }
    }

    const token = (Math.random() * 1000).toString()
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(session?.user?.id),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token:token,
        }
    });

    return {
        message: "Done"
    }
}