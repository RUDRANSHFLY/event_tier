"use client";

import { useState, useTransition } from "react";
import EventCard from "./event-card";
import { Event } from "@/types";
import { upgradeTier } from "@/server/upgrade-tier";

const tierOrder = ["free", "silver", "gold", "platinum"] as const;
type Tier = typeof tierOrder[number];

interface Props {
  events: Event[] | null;
  error: Error | null;
  userTier: Tier;
}

const EventsSection = ({ events, error, userTier }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [currentTier, setCurrentTier] = useState<Tier>(userTier);

  if (error) {
    return (
      <div className="text-center text-red-600 py-12">
        Failed to load events: {error.message}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-500">
        No events available yet.
      </div>
    );
  }

  const userTierIndex = tierOrder.indexOf(currentTier);

  const handleUpgrade = (newTier: Tier) => {
    startTransition(async () => {
      try {
        const updatedTier = await upgradeTier(newTier);
        setCurrentTier(updatedTier);
        alert(`Successfully upgraded to ${updatedTier}!`);
      } catch (err) {
        console.error("Upgrade error:", err);
        alert("Failed to upgrade tier. Please try again.");
      }
    });
  };

  const availableUpgrades = tierOrder.slice(userTierIndex + 1);

  return (
    <div>
      <div className="mb-6 flex flex-col items-center gap-4">
        <p className="text-gray-700">
          Your current tier:{" "}
          <span className="font-bold capitalize">{currentTier}</span>
        </p>

        {availableUpgrades.length > 0 ? (
          <div className="flex gap-2">
            {availableUpgrades.map((tier) => (
              <button
                key={tier}
                disabled={isPending}
                onClick={() => handleUpgrade(tier)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isPending ? "Upgrading..." : `Upgrade to ${tier}`}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-green-600 font-semibold">
            You are at the highest tier 🎉
          </p>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {events.map((event) => {
          const eventTierIndex = tierOrder.indexOf(event.tier as Tier);
          const locked = eventTierIndex > userTierIndex;

          return (
            <div key={event.id} className="relative">
              <EventCard {...event} />
              {locked && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <p className="text-gray-800 text-sm font-semibold text-center px-4">
                    Upgrade to {event.tier} to access this event
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsSection;
