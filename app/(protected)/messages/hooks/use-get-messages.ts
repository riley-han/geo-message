"use client";

import { useEffect, useState } from "react";
import type { ConversationMember } from "./use-get-conversation-members";

export type Message = {
  id: string;
  content: string;
  sender_id: string;
  is_geo_locked: boolean;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  created_at: string;
  updated_at: string;
  profiles: {
    display_name: string;
  } | null;
};

export type conversationRequestParams = {
  conversationId: string;
};

export const useGetConversationData = (params: conversationRequestParams) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<ConversationMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (!params.conversationId) return;

    try {
      const res = await fetch(
        `/api/conversation?conversationId=${params.conversationId}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setMessages([]);
        setMembers([]);
        return;
      }

      const data = (await res.json()) as {
        messages?: Message[];
        members?: ConversationMember[];
      };
      setMessages(Array.isArray(data.messages) ? data.messages : []);
      setMembers(Array.isArray(data.members) ? data.members : []);
    } catch {
      setMessages([]);
      setMembers([]);
    }
  };

  useEffect(() => {
    if (!params.conversationId) return;

    setIsLoading(true);
    fetchData().finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.conversationId]);

  return { messages, members, isLoading, refetch: fetchData };
};
