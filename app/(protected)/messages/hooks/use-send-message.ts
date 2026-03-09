"use client";

import { useState } from "react";

export const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (conversationId: string, content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to send message");
        return false;
      }

      return true;
    } catch {
      setError("Network error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};
