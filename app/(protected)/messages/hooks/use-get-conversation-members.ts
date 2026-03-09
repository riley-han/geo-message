"use client";

import { useEffect, useState } from "react";

export type ConversationMember = {
  id: string;
  user_id: string;
  created_at: string;
  profiles: {
    display_name: string;
  } | null;
};

export const useGetConversationMembers = (conversationId: string) => {
  const [members, setMembers] = useState<ConversationMember[]>([]);

  const fetchMembers = async () => {
    if (!conversationId) return;

    try {
      const res = await fetch(
        `/api/conversation/members?conversationId=${conversationId}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setMembers([]);
        return;
      }

      const data = (await res.json()) as { members?: ConversationMember[] };
      setMembers(Array.isArray(data.members) ? data.members : []);
    } catch {
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return { members, refetchMembers: fetchMembers };
};
