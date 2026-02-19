import { createServerSupabase } from "@/lib/supabaseServer";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ⬅ MUST await

  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Not authenticated", { status: 401 });
  }

  // Verify the bookmark belongs to the user before deleting
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return new Response("Deleted", { status: 200 });
}
