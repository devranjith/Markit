import { createServerSupabase } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return Response.json(data);
}

export async function POST(req: Request) {
  const supabase = await createServerSupabase();
  const { url, title } = await req.json();

  // Get logged in user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return new Response("Not authenticated", { status: 401 });
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      url,
      title,
      user_id: user.id,
    })
    .select();

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return Response.json(data);
}
