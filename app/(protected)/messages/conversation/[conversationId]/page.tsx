"use client";

import { Lock, MapPin } from "lucide-react";
import { useCurrentLocation } from "./components/current-location";
import TextEditor from "./components/text-editor";
import { mockMessages } from "../mock-data";
import { getDistanceMeters, GEOFENCE_RADIUS_METERS } from "@/app/utils/geo-location";


const myUserId = "123";



const ConversationPage = () => {
  const currentLocation = useCurrentLocation();

  return (
    <div className="h-screen">
      <div className="relative flex flex-col h-screen w-full sm:w-full md:w-1/4 md:mx-auto md:max-w-sm">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide-mobile flex flex-col gap-2 p-2 pb-20">
          {mockMessages.map((message) => {
            const isFromMe = message.senderId === myUserId;

            let isUnlocked = true;

            if (message.geoLocked) {
              if (message.coordinates && currentLocation) {
                const distance = getDistanceMeters(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  message.coordinates.latitude,
                  message.coordinates.longitude
                );

                isUnlocked = distance <= GEOFENCE_RADIUS_METERS;
              } else {
                isUnlocked = false;
              }
            }

            if (message.geoLocked && !isUnlocked) {
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    isFromMe ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[10px] text-muted-foreground mb-0.5">
                    {message.senderName}
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
                  {message.senderName}
                </span>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    isFromMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-background p-2">
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;