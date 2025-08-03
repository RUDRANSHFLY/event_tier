"use server";


import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; 


export async function upgradeTier(newTier: "free" | "silver" | "gold" | "platinum") {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const updatedUser = await clerkClient.users.updateUser(userId, {
    publicMetadata: { tier: newTier },
  });

  return updatedUser.publicMetadata?.tier as "free" | "silver" | "gold" | "platinum";
}
