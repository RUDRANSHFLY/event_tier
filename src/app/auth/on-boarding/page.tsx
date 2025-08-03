"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SelectTierPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [tier, setTier] = useState<string>("");

  // Prefill if tier exists
  useEffect(() => {
    if (isLoaded && user) {
      const currentTier = user.unsafeMetadata?.tier as string;
      if (currentTier) {
        setTier(currentTier);
      }
    }
  }, [isLoaded, user]);

  const handleSubmit = async () => {
    if (!tier) {
      toast.error("Please select a tier");
      return;
    }

    try {
      await user?.update({
        unsafeMetadata: {
          tier,
        },
      });

      toast.success(`Tier set to ${tier}`);
      router.push("/events");
    } catch (error) {
      toast.error("Failed to update tier. Try again.");
      console.error(error);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background px-4">
      <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Choose Your Tier
        </h1>

        <Select value={tier} onValueChange={(value) => setTier(value)}>
          <SelectTrigger className="w-full mb-6">
            <SelectValue placeholder="Select a Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="platinum">Platinum</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleSubmit}
          className="w-full bg-[#6c47ff] text-white font-medium"
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
}
