"use client";

import { Lock, MapPin } from "lucide-react";
import { useCurrentLocation } from "./components/current-location";
import TextEditor from "./components/text-editor";
import { Message, useGetConversationData } from "../../hooks/use-get-messages";
import {
  getDistanceMeters,
  GEOFENCE_RADIUS_METERS,
} from "@/app/utils/geo-location";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSendMessage } from "../../hooks/use-send-message";
import ConversationMembers from "./components/conversation-members";
import MessageListSkeleton from "./components/message-skeleton";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

const ConversationPage = () => {
  const { conversationId } = useParams();
  const { user } = useCurrentUser();
  const currentLocation = useCurrentLocation();
  const { messages, members, isLoading: isLoadingMessages, refetch } = useGetConversationData({
    conversationId: conversationId as string,
  });
  const { sendMessage, isLoading: isSending } = useSendMessage();

  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) return;

    const client = createClient();
    console.log(`[Realtime] Subscribing to channel messages:${conversationId}`);

    const channel = client
      .channel(`messages`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: RealtimePostgresInsertPayload<Record<string, unknown>>) => {
          console.log("[Realtime] New message received:", payload.new);
          const msg = payload.new as unknown as Message;
          setRealtimeMessages((prev) => [...prev, msg]);
        }
      )
      .subscribe((status: string, err?: Error) => {
        console.log(`[Realtime] Channel status: ${status}`, err ?? "");
      });

    return () => {
      console.log(`[Realtime] Unsubscribing from messages:${conversationId}`);
      client.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    setRealtimeMessages([]);
  }, [messages]);

  const allMessages = useMemo(() => {
    const fetchedIds = new Set(messages.map((m) => m.id));
    const uniqueRealtime = realtimeMessages.filter((m) => !fetchedIds.has(m.id));
    return [...messages, ...uniqueRealtime];
  }, [messages, realtimeMessages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [allMessages.length]);


  if (!conversationId) {
    return <div>Conversation not found</div>;
  }
  return (
    <div className="h-screen">
      <div className="relative flex flex-col h-screen w-full sm:w-full md:w-1/4 md:mx-auto md:max-w-sm">
        <ConversationMembers
          conversationId={conversationId as string}
          members={members}
          onMembersChanged={refetch}
        />
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto scrollbar-hide-mobile flex flex-col gap-2 p-2 pb-20">
          {isLoadingMessages ? (
            <MessageListSkeleton />
          ) : allMessages.map((message) => {
            const isFromMe = message.sender_id === user?.id;

            let isUnlocked = true;

            if (message.is_geo_locked) {
              if (message.location && currentLocation) {
                const distance = getDistanceMeters(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  message.location?.latitude,
                  message.location?.longitude
                );

                isUnlocked = distance <= GEOFENCE_RADIUS_METERS;
              } else {
                isUnlocked = false;
              }
            }

            if (message.is_geo_locked && !isUnlocked) {
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    isFromMe ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[10px] text-muted-foreground mb-0.5">
                    {message.profiles?.display_name}
                  </span>
                  <div className="max-w-[85%] min-w-[140px] rounded-lg px-3 py-2 border-2 border-dashed border-muted-foreground/30 bg-muted/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                        <MapPin className="size-3.5 animate-pulse" />
                        <Lock className="size-3.5" />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Get closer to unlock
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex flex-col ${
                  isFromMe ? "items-end" : "items-start"
                }`}
              >
                <span className="text-[10px] text-muted-foreground mb-0.5">
                  {message.profiles?.display_name}
                </span>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    isFromMe ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
          </div>
        <div className="absolute inset-x-0 bottom-0 bg-background p-2">
          <TextEditor
            isLoading={isSending}
            onSend={async (content) => {
              await sendMessage(conversationId as string, content);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
