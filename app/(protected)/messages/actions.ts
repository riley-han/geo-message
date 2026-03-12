"use server";

import { createClient } from "@/lib/supabase/server";

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

export async function sendMessage(
  conversationId: string,
  content: string
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!conversationId || !content?.trim()) {
    return { success: false, error: "conversationId and content are required" };
  }

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    content: content.trim(),
    is_geo_locked: false,
    location: null,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function addConversationMember(
  conversationId: string,
  userId: string
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!conversationId || !userId) {
    return { success: false, error: "conversationId and userId are required" };
  }

  const { error } = await supabase
    .from("conversation_members")
    .insert({ conversation_id: conversationId, user_id: userId });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function leaveConversation(
  conversationId: string
): Promise<ActionResult<boolean>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!conversationId) {
    return { success: false, error: "conversationId is required" };
  }

  const { error } = await supabase
    .from("conversation_members")
    .delete()
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: true };
}

type CreateConversationResult = { id: string; title: string };

export async function createConversation(
  title: string
): Promise<ActionResult<CreateConversationResult>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!title?.trim()) {
    return { success: false, error: "Title is required" };
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({ title: title.trim() })
    .select("id, title")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  const { error: memberError } = await supabase
    .from("conversation_members")
    .insert({ conversation_id: data.id, user_id: user.id });

  if (memberError) {
    return { success: false, error: memberError.message };
  }

  return { success: true, data: { id: data.id, title: data.title } };
}
