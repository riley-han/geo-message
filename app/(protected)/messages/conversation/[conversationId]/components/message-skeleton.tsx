import { Skeleton } from "@/components/ui/skeleton";

const MessageSkeleton = ({ align }: { align: "left" | "right" }) => {
  return (
    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <Skeleton className="h-2.5 w-16 mb-1" />
      <Skeleton
        className={`h-10 rounded-lg ${
          align === "right" ? "w-[55%]" : "w-[65%]"
        }`}
      />
    </div>
  );
};

const MessageListSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="flex flex-col gap-3 p-2">
      {Array.from({ length: count }).map((_, i) => (
        <MessageSkeleton key={i} align={i % 3 === 0 ? "right" : "left"} />
      ))}
    </div>
  );
};

export default MessageListSkeleton;
