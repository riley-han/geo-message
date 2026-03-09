"use client";

import { useEffect, useState } from "react";

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

export const useGetMessages = (params: conversationRequestParams) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    if (!params.conversationId) return;

    try {
      const res = await fetch(
        `/api/conversation?conversationId=${params.conversationId}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setMessages([]);
        return;
      }

      const data = (await res.json()) as { messages?: Message[] };
      setMessages(Array.isArray(data.messages) ? data.messages : []);
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!params.conversationId) return;

    setIsLoading(true);
    fetchMessages().finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.conversationId]);

  return { messages, isLoading, refetchMessages: fetchMessages };
};
