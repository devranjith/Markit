"use client";

import { useState } from "react";
import RealtimeBookmarks from "./RealtimeBookmark";
import AddBookmark from "./AddBookmark";

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  user_id: string;
  created_at: string;
}

interface ClientDashboardProps {
  initialBookmarks: Bookmark[];
}

export default function ClientDashboard({
  initialBookmarks,
}: ClientDashboardProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  async function refresh() {
    const res = await fetch("/api/bookmarks");
    const data: Bookmark[] = await res.json();
    setBookmarks(data);
  }

  async function deleteBookmark(id: string) {
    // Optimistically remove from UI immediately
    setBookmarks((prev) => prev.filter((b) => b.id !== id));

    try {
      const res = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // If delete failed, refresh to restore correct state
        await refresh();
      }
    } catch (error) {
      // If delete failed, refresh to restore correct state
      await refresh();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <RealtimeBookmarks onChange={refresh} />
      <AddBookmark onBookmarkAdded={refresh} />

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10">
            <svg
              className="w-6 h-6 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <p className="text-white/30 text-sm">
            No bookmarks yet. Add your first one!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="group flex items-center justify-between px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
            >
              {/* FIXED <a> TAG */}
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                {/* Favicon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=32`}
                    alt=""
                    className="w-4 h-4"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate group-hover:text-purple-300 transition-colors">
                    {b.title}
                  </p>
                  <p className="text-white/30 text-xs truncate">{b.url}</p>
                </div>
              </a>

              <button
                onClick={() => deleteBookmark(b.id)}
                className="flex-shrink-0 ml-4 cursor-pointer p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
