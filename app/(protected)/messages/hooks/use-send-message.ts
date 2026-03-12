"use client";

import { useTransition, useState } from "react";
import { sendMessage as sendMessageAction } from "../actions";

export const useSendMessage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const sendMessage = (conversationId: string, content: string) => {
    setError(null);
    startTransition(async () => {
      const result = await sendMessageAction(conversationId, content);
      if (!result.success) {
        setError(result.error);
      }
    });
  };

  return { sendMessage, isLoading: isPending, error };
};
