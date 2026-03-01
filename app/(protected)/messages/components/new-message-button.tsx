"use client";

import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";

interface NewMessageButtonProps {
  onOpenNewMessageModal: () => void;
}

const NewMessageButton = ({ onOpenNewMessageModal }: NewMessageButtonProps) => {
  return (
    <div>
      <Button onClick={onOpenNewMessageModal}>
        <MessageSquareText className="size-4" />
        New Message
      </Button>
    </div>
  );
};

export default NewMessageButton;
