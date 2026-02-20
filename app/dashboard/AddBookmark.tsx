"use client";
import { useState } from "react";

interface AddBookmarkProps {
  onBookmarkAdded?: () => void;
}

export default function AddBookmark({ onBookmarkAdded }: AddBookmarkProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !url.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url }),
      });

      if (res.ok) {
        setTitle("");
        setUrl("");
        // Trigger refresh callback if provided
        onBookmarkAdded?.();
      } else {
        console.error("Failed to add bookmark:", await res.text());
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={addBookmark}
      className="flex flex-col md:flex-row gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full md:flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 
               text-white text-sm placeholder-white/20 
               focus:outline-none focus:border-purple-500/50 focus:bg-white/10 
               transition-all duration-200"
      />

      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full md:flex-[2] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 
               text-white text-sm placeholder-white/20 
               focus:outline-none focus:border-purple-500/50 focus:bg-white/10 
               transition-all duration-200"
      />

      <button
        disabled={isSubmitting}
        className="w-full md:w-auto flex items-center justify-center gap-2 
               px-5 py-2.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 
               border border-purple-500/30 hover:border-purple-400/50 
               text-white text-sm font-medium 
               disabled:opacity-40 disabled:cursor-not-allowed 
               transition-all duration-200 shadow-lg shadow-purple-900/30"
      >
        {isSubmitting ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Adding...
          </>
        ) : (
          <>
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </>
        )}
      </button>
    </form>
  );
}
