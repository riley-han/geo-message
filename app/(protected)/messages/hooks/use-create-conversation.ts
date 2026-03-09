"use client";

import { useState } from "react";

type Conversation = {
  id: string;
  title: string;
};

export const useCreateConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConversation = async (
    title: string
  ): Promise<Conversation | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to create conversation");
        return null;
      }

      return data.conversation as Conversation;
    } catch {
      setError("Network error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createConversation, isLoading, error };
};
