import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

interface TextEditorProps {
  onSend: (content: string) => Promise<void>;
  isLoading?: boolean;
}

const TextEditor = ({ onSend, isLoading }: TextEditorProps) => {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    await onSend(messageText.trim());
    setMessageText("");
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSendMessage();
          }
        }}
      />
      <div className="flex gap-2 justify-end">
        <Button
          size="lg"
          disabled={!messageText.trim() || isLoading}
          onClick={() => void handleSendMessage()}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
        <Button className="bg-blue-200" size="icon-lg" variant="outline">
          <Compass className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
