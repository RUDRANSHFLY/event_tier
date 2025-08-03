import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import AuthScreen from "./auth/auth";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import EventsSection from "@/components/events-page";

const HomePage = async () => {
  const { userId } = await auth();
  if (!userId) return <AuthScreen />;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user = await currentUser();
  const userTier =
    (user?.publicMetadata?.tier as "free" | "silver" | "gold" | "platinum") || "free";

  const { data: events, error } = await supabase
    .from("events")
    .select()
    .order("event_date", { ascending: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 drop-shadow-sm">
          Upcoming Events
        </h1>
        <p className="mt-2 text-gray-600">
          Explore events tailored to your membership tier
        </p>
      </div>

      <EventsSection events={events} error={error as Error} userTier={userTier} />
    </div>
  );
};

export default HomePage;
