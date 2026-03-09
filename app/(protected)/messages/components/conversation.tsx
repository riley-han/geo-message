"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
interface ConversationProps {
  title?: string;
  conversationId: string;
}

const Conversation = ({ title, conversationId }: ConversationProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`messages/conversation/${conversationId}`);
  };
  const avatarAltText = title?.charAt(0);

  return (
    <div
      className="flex items-center justify-between gap-3 border-b p-3 md:p-2 border-gray-200 min-h-[4.5rem] md:h-20 hover:bg-gray-50"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex-shrink-0">
          <Avatar size="lg">
            <AvatarFallback>{avatarAltText}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <p className="truncate font-medium" title={title}>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
