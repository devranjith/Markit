"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";

interface RealtimeBookmarksProps {
  onChange: (payload: any) => void;
}
export default function RealtimeBookmarks({
  onChange,
}: RealtimeBookmarksProps) {
  const onChangeRef = useRef(onChange);
  
  // Keep the ref updated
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const supabase = createClient();
    
    // Verify we have a session before subscribing
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        console.warn("⚠️ No session found, realtime may not work properly");
        return;
      }
      console.log("✅ Session found, setting up realtime subscription");
    });

    const channel = supabase
      .channel("bookmarks-realtime", {
        config: {
          broadcast: { self: true },
        },
      })
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        (payload) => {
          // Explicitly handle all event types including INSERT, UPDATE, DELETE
          console.log("🔔 Realtime event received:", payload.eventType, payload);
          // Always refresh on any change
          onChangeRef.current(payload);
        },
      )
      .subscribe((status) => {
        console.log("📡 Subscription status:", status);
        if (status === "SUBSCRIBED") {
          console.log("✅ Successfully subscribed to bookmarks changes");
        }
        if (status === "CHANNEL_ERROR") {
          console.error("❌ Channel error");
        }
        if (status === "TIMED_OUT") {
          console.error("⏱️ Channel timed out - check Supabase Realtime is enabled");
        }
        if (status === "CLOSED") {
          console.warn("🔒 Channel closed");
        }
      });

    return () => {
      console.log("🧹 Cleaning up realtime subscription");
      supabase.removeChannel(channel);
    };
  }, []); // Empty deps - only run once

  return null;
}
