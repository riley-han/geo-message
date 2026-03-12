"use client";

import { useState } from "react";
import { createConversation as createConversationAction } from "../actions";

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
    setError(null);
    setIsLoading(true);
    try {
      const result = await createConversationAction(title);
      if (result.success && result.data) {
        return result.data;
      }
      if (!result.success) {
        setError(result.error);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createConversation, isLoading, error };
};
