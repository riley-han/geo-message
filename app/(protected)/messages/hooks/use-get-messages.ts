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

  useEffect(() => {
    if (!params.conversationId) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        const res = await fetch(
          `/api/conversation?conversationId=${params.conversationId}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!res.ok) {
          setMessages([]);
          return;
        }

        const data = (await res.json()) as { messages?: Message[] };
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return;
        setMessages([]);
      }
    };

    run();

    return () => controller.abort();
  }, [params.conversationId]);

  console.log(messages, "what is this data");

  return messages;
};
