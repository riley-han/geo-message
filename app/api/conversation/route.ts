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
  const conversationId = searchParams.get("conversationId");

  const [messagesResult, membersResult] = await Promise.all([
    supabase
      .from("messages")
      .select(
        "id, content, is_geo_locked, location, created_at, sender_id, profiles:sender_id(display_name)"
      )
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true }),
    supabase
      .from("conversation_members")
      .select("id, user_id, created_at, profiles:user_id(display_name)")
      .eq("conversation_id", conversationId),
  ]);

  if (messagesResult.error) {
    return NextResponse.json({ error: messagesResult.error.message }, { status: 500 });
  }

  if (membersResult.error) {
    return NextResponse.json({ error: membersResult.error.message }, { status: 500 });
  }

  return NextResponse.json({
    messages: messagesResult.data ?? [],
    members: membersResult.data ?? [],
  });
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
  const { conversationId, content } = body as {
    conversationId?: string;
    content?: string;
  };

  if (!conversationId || !content?.trim()) {
    return NextResponse.json(
      { error: "conversationId and content are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: content.trim(),
      is_geo_locked: false,
      location: null,
    })
    .select(
      "id, content, is_geo_locked, location, created_at, sender_id, profiles:sender_id(display_name)"
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: data }, { status: 201 });
}