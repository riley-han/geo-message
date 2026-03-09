"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateConversation } from "../hooks/use-create-conversation";

interface NewMessageDrawerProps {
  open: boolean;
  handleIsOpen: () => void;
}

const NewMessageDrawer = ({ open, handleIsOpen }: NewMessageDrawerProps) => {
  const [title, setTitle] = useState("");
  const { createConversation, isLoading, error } = useCreateConversation();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim()) return;

    const conversation = await createConversation(title.trim());

    if (conversation) {
      setTitle("");
      handleIsOpen();
      router.push(`/messages/conversation/${conversation.id}`);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleIsOpen} direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MessageSquareText />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>New Conversation</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <label htmlFor="conv-title" className="text-sm font-medium">
              Conversation title
            </label>
            <Input
              id="conv-title"
              className="mt-2"
              placeholder="e.g. Hawaii Trip"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {error && (
            <p className="px-4 text-sm text-red-500">{error}</p>
          )}
          <DrawerFooter>
            <Button
              disabled={!title.trim() || isLoading}
              onClick={() => void handleSubmit()}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NewMessageDrawer;
