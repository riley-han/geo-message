import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import UnreadNotifications from "./unread-notifications";
interface ConversationProps {
  title?: string;
  unReadCount: number;
  lastMessagePreview?: string;
  imageUrl?: string;
  contactName?: string;
  isGroup: boolean;
}

const Conversation = ({
  title,
  unReadCount,
  lastMessagePreview,
  imageUrl,
  contactName,
  isGroup,
}: ConversationProps) => {
  const avatarAltText = isGroup ? title?.charAt(0) : contactName?.charAt(0);

  return (
    <div className="flex items-center justify-between gap-3 border-b p-3 md:p-2 border-gray-200 min-h-[4.5rem] md:h-20 hover:bg-gray-50">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex-shrink-0">
          <Avatar size="lg">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{avatarAltText}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <p
            className="truncate font-medium"
            title={isGroup ? title : contactName}
          >
            {isGroup ? title : contactName}
          </p>
          <p
            className="text-sm text-gray-400 truncate"
            title={lastMessagePreview}
          >
            {lastMessagePreview}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <UnreadNotifications />
      </div>
    </div>
  );
};

export default Conversation;
