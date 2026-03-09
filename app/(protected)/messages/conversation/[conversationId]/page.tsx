"use client";

import { Lock, MapPin } from "lucide-react";
import { useCurrentLocation } from "./components/current-location";
import TextEditor from "./components/text-editor";
import { useGetConversationData } from "../../hooks/use-get-messages";
import {
  getDistanceMeters,
  GEOFENCE_RADIUS_METERS,
} from "@/app/utils/geo-location";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSendMessage } from "../../hooks/use-send-message";
import ConversationMembers from "./components/conversation-members";
import MessageListSkeleton from "./components/message-skeleton";

const ConversationPage = () => {
  const { conversationId } = useParams();
  const { user } = useCurrentUser();
  const currentLocation = useCurrentLocation();
  const { messages, members, isLoading: isLoadingMessages, refetch } = useGetConversationData({
    conversationId: conversationId as string,
  });
  const { sendMessage, isLoading: isSending } = useSendMessage();

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
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide-mobile flex flex-col gap-2 p-2 pb-20">
          {isLoadingMessages ? (
            <MessageListSkeleton />
          ) : messages.map((message) => {
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
              const success = await sendMessage(
                conversationId as string,
                content
              );
              if (success) {
                refetch();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
