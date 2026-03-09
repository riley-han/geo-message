import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// load conversations for user's account
export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(Number(limitParam), 1), 50) : 10;

  const { data, error } = await supabase
    .from("conversation_members")
    .select("conversations:conversation_id(id, title, updated_at)")
    .eq("user_id", user.id)
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const conversations = (data ?? [])
    .map((row) => {
      const conv = row.conversations;
      return Array.isArray(conv) ? conv[0] : conv;
    })
    .filter(
      (c): c is { id: string; title: string; updated_at: string } => !!c
    )
    .sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1));

  return NextResponse.json({ conversations });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title } = body as { title?: string };

  if (!title || title.trim().length === 0) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({ title: title.trim() })
    .select("id, title")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { error: memberError } = await supabase
    .from("conversation_members")
    .insert({ conversation_id: data.id, user_id: user.id });

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.json({ conversation: data }, { status: 201 });
}
