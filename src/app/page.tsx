import { auth } from "@clerk/nextjs/server";
import React from "react";
import AuthScreen from "./auth/auth";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import EventCard from "@/components/event-card";
import { Event } from "@/types";

const HomePage = async () => {
  const { userId } = await auth();

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: events } = await supabase.from("events").select();

  if (!userId) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 drop-shadow-sm">
          Upcoming Events
        </h1>
        <p className="mt-2 text-gray-600">
          Explore events tailored to your membership tier
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {events?.length ? (
          events.map((event: Event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              image_url={event.image_url}
              desc={event.desc}
              event_date={event.event_date}
              tier={event.tier}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No events available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
