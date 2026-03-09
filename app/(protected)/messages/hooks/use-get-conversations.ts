"use client";

import { useEffect, useState } from "react";

export type Conversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export const useGetConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/messages?limit=10", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          setConversations([]);
          return;
        }

        const data = (await res.json()) as { conversations?: Conversation[] };
        setConversations(
          Array.isArray(data.conversations) ? data.conversations : []
        );
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return;
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, []);

  return { conversations, isLoading };
};
