import { useGetConversations } from "./hooks/use-get-conversations";
import Conversation from "./components/conversation";
import SearchConversations from "./components/search-conversations";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";

const MessagesPage = () => {
  const conversations = useGetConversations();
  return (
    <div className="h-screen">
    <div className="flex flex-col h-[90%] w-full md:w-1/4 md:mx-auto md:max-w-sm">
      <SearchConversations />
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide-mobile">
        {conversations.map((conversation) => (
          <Conversation key={conversation.id} {...conversation} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
          <Button variant="outline" size="icon" className="bg-slate-200">
            <MessageSquareText className="size-5" />
          </Button>
        </div>

    </div>
    </div>
  );
};

export default MessagesPage;
