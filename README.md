# Smart Bookmark App

A simple bookmark manager built with Next.js App Router, Supabase, and Tailwind CSS.

## Features

- ✅ Google OAuth authentication (no email/password)
- ✅ Add bookmarks with URL and title
- ✅ Private bookmarks (user-specific data isolation)
- ✅ Real-time updates across tabs without page refresh
- ✅ Delete bookmarks
- ✅ Deployed on Vercel

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend/Database/Auth**: Supabase (Auth, Database, Realtime)
- **Styling**: Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Problems Encountered and Solutions

### 1. Session Data Not Available in Dashboard After OAuth Login

**Problem**: After logging in with Google OAuth, the dashboard page couldn't access the user session. The session wasn't being stored properly for server-side access.

**Solution**: 
- Changed the login client from vanilla `createClient` to `createBrowserClient` from `@supabase/ssr` to store the PKCE code_verifier in cookies instead of localStorage
- Created a Route Handler (`app/auth/callback/route.ts`) to handle the OAuth callback server-side and exchange the authorization code for a session using `exchangeCodeForSession()`
- This ensures the session is stored in cookies, making it accessible to both client and server components

### 2. DELETE Operations Not Reflecting in Real-time

**Problem**: When deleting a bookmark, the UI didn't update immediately - it required a page refresh to see the change, even though real-time subscriptions were set up.

**Solution**:
- Implemented optimistic UI updates - immediately remove the item from state when delete is clicked
- Added error handling to refresh the list if the delete operation fails
- Improved the realtime subscription to explicitly handle DELETE events with better logging
- This provides instant feedback while still maintaining real-time sync across tabs

### 3. Security: Missing User Isolation in Queries

**Problem**: Initial bookmarks query in the dashboard wasn't filtering by `user_id`, potentially exposing other users' bookmarks. The DELETE endpoint also didn't verify ownership.

**Solution**:
- Added `.eq("user_id", user.id)` filter to the dashboard's initial bookmarks query
- Added `.eq("user_id", user.id)` to the DELETE endpoint to ensure users can only delete their own bookmarks
- This ensures complete data isolation between users

### 4. Hardcoded Redirect URL

**Problem**: The OAuth redirect URL was hardcoded to `localhost:3000`, which wouldn't work in production.

**Solution**:
- Made the redirect URL dynamic using `window.location.origin` for client-side detection
- Falls back to localhost for server-side rendering during development

## Deployment

The app is deployed on Vercel. Make sure to:
1. Add your Supabase environment variables in Vercel's project settings
2. Add your production callback URL to Supabase's allowed redirect URLs
3. Ensure your Supabase project has Realtime enabled for the `bookmarks` table

## Live URL

[Your Vercel deployment URL here]
