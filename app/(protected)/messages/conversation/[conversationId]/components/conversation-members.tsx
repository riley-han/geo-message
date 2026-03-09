"use client";

import { useState, useMemo } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetConversationMembers } from "../../../hooks/use-get-conversation-members";
import { useGetProfiles } from "../../../hooks/use-get-profiles";
import { useAddConversationMember } from "../../../hooks/use-add-conversation-member";

interface ConversationMembersProps {
  conversationId: string;
}

const ConversationMembers = ({ conversationId }: ConversationMembersProps) => {
  const { members, refetchMembers } = useGetConversationMembers(conversationId);
  const profiles = useGetProfiles();
  const { addMember, isLoading, error } = useAddConversationMember();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [showSelect, setShowSelect] = useState(false);

  const memberUserIds = useMemo(
    () => new Set(members.map((m) => m.user_id)),
    [members]
  );

  const availableProfiles = useMemo(
    () => profiles.filter((p) => !memberUserIds.has(p.id)),
    [profiles, memberUserIds]
  );

  const handleAdd = async () => {
    if (!selectedUserId) return;

    const success = await addMember(conversationId, selectedUserId);

    if (success) {
      setSelectedUserId(undefined);
      setShowSelect(false);
      refetchMembers();
    }
  };

  return (
    <div className="border-b px-3 py-2">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide-mobile">
        {members.map((member) => (
          <span
            key={member.id}
            className="flex-shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
          >
            {member.profiles?.display_name ?? "Unknown"}
          </span>
        ))}
        {!showSelect && (
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-6"
            onClick={() => setShowSelect(true)}
          >
            <UserPlus className="size-3.5" />
          </Button>
        )}
      </div>

      {showSelect && (
        <div className="mt-2 flex items-center gap-2">
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger className="flex-1 h-8 text-xs">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Users</SelectLabel>
                {availableProfiles.length > 0 ? (
                  availableProfiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.display_name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    No users to add
                  </div>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="h-8 text-xs"
            disabled={!selectedUserId || isLoading}
            onClick={() => void handleAdd()}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={() => {
              setShowSelect(false);
              setSelectedUserId(undefined);
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ConversationMembers;
