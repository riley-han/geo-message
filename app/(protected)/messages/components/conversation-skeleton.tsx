import { Skeleton } from "@/components/ui/skeleton";

const ConversationSkeleton = () => {
  return (
    <div className="flex items-center gap-3 border-b p-3 md:p-2 border-gray-200 min-h-[4.5rem] md:h-20">
      <Skeleton className="size-10 rounded-full flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <Skeleton className="size-2 rounded-full flex-shrink-0" />
    </div>
  );
};

const ConversationListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ConversationSkeleton key={i} />
      ))}
    </>
  );
};

export default ConversationListSkeleton;
