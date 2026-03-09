"use client";

import { useState } from "react";

export const useAddConversationMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMember = async (conversationId: string, userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/conversation/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to add member");
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

  return { addMember, isLoading, error };
};
