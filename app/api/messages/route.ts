import { NextResponse } from "next/server";

import { generateMockConversations } from "@/app/(protected)/messages/mock-data/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : 10;

  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 10;

  const conversations = generateMockConversations(safeLimit);

  return NextResponse.json({
    conversations,
    meta: {
      limit: safeLimit,
    },
  });
}

