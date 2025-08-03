"use client";

import { upgradeTier } from "@/server/upgrade-tier";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const TierForm = () => {
  const [tier, setTier] = useState<
    "free" | "silver" | "gold" | "platinum" | null
  >(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!tier) {
      toast.error("Please select a tier");
      return;
    }

    startTransition(async () => {
      try {
        const updatedTier = await upgradeTier(tier);
        toast.success(`Tier set to ${updatedTier}`);
        router.push("/");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update tier. Try again.");
      }
    });
  };

  return (
    <div>
      {/* Example tier selector */}
      <select
        title="tier_select"
        value={tier || ""}
        onChange={(e) =>
          setTier(e.target.value as "free" | "silver" | "gold" | "platinum")
        }
        className="border p-2 rounded"
      >
        <option value="" disabled>
          Select a tier
        </option>
        <option value="free">Free</option>
        <option value="silver">Silver</option>
        <option value="gold">Gold</option>
        <option value="platinum">Platinum</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update Tier"}
      </button>
    </div>
  );
};

export default TierForm;
