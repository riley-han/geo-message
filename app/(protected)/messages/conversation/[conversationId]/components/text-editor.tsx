import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

const TextEditor = () => {
  const [messageText, setMessageText] = useState("");
  const handleSendMessage = () => {
    console.log(messageText);
  };
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <div className="flex gap-2 justify-end">
        <Button size="lg" disabled={!messageText} onClick={handleSendMessage}>
          Send
        </Button>
        <Button className="bg-slate-500" size="icon-lg" variant="outline">
          <Compass className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
