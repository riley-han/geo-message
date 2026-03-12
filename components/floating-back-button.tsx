"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIDE_BACK_PATHS = ["/", "/login"];

export function FloatingBackButton() {
  const pathname = usePathname();
  const router = useRouter();

  const show = pathname && !HIDE_BACK_PATHS.includes(pathname);

  if (!show) return null;

  return (
    <div className="fixed left-0 top-0 z-50 p-3 pt-[env(safe-area-inset-top)] md:hidden mt-2">
      <Button
        variant="secondary"
        size="icon"
        className="h-10 w-10 rounded-full shadow-md bg-transparent"
        aria-label="Go back"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-5" />
      </Button>
    </div>
  );
}
