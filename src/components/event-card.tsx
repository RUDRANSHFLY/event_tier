import { Event } from "@/types";
import { Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

const tierStyles: Record<string, string> = {
  free: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  silver:
    "bg-gradient-to-r from-gray-300 to-gray-400 text-black hover:from-gray-400 hover:to-gray-500",
  gold: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 hover:from-yellow-500 hover:to-yellow-600",
  platinum:
    "bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 text-black hover:from-slate-400 hover:via-slate-500 hover:to-slate-600",
};

const EventCard = ({ title, image_url, desc, tier, event_date }: Event) => {
  const formattedDate = event_date.split("T")[0];

  return (
    <div className="w-80 h-80 bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
      {/* Image with overlay */}
      <div className="relative w-full h-44">
        {image_url && (
          <Image className="object-cover" fill src={image_url} alt={title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <h1 className="absolute bottom-2 left-3 text-xl font-bold text-white drop-shadow">
          {title}
        </h1>
      </div>

      {/* Content */}
      <div className="px-4 py-3 flex flex-col gap-y-3 text-gray-800">
        {desc && (
          <p className="text-sm text-gray-600 leading-snug">
            {desc.length > 100 ? desc.substring(0, 100) + "..." : desc}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto">
          {/* Date */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>

          {/* Tier Button */}
          <button
            type="button"
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all",
              tierStyles[tier.toLowerCase()] || tierStyles["free"]
            )}
          >
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
