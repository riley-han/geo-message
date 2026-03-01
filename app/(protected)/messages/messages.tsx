"use client";

import Conversation from "./components/conversation";
import NewMessageButton from "./components/new-message-button";
import NewMessageDrawer from "./components/new-message-drawer";
import SearchConversations from "./components/search-conversations";
import { useGetConversations } from "./hooks/use-get-conversations";
import { useState } from "react";

const Messages = () => {
  const [newMessageDrawerOpen, setNewMessageDrawerOpen] = useState(false);
  const conversations = useGetConversations();
  const handleNewMessageClick = () => {
    setNewMessageDrawerOpen((open) => !open);
  };
  return (
    <div className="h-screen">
      <div className="flex flex-col h-[90%] w-full md:w-1/4 md:mx-auto md:max-w-sm">
        <SearchConversations />
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide-mobile">
          {conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              conversationId={conversation.id}
              {...conversation}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <NewMessageDrawer
          open={newMessageDrawerOpen}
          handleIsOpen={handleNewMessageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
