"use client";

import { useState } from "react";
import { addConversationMember as addConversationMemberAction } from "../actions";

export const useAddConversationMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMember = async (
    conversationId: string,
    userId: string
  ): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await addConversationMemberAction(conversationId, userId);
      if (!result.success) {
        setError(result.error);
        return false;
      }
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return { addMember, isLoading, error };
};
