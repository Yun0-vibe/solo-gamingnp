import { NextResponse } from "next/server";
import { getLiveVideoId } from "@/lib/youtube";

export const revalidate = 30;

export async function GET() {
  const videoId = await getLiveVideoId();

  return NextResponse.json(
    { live: Boolean(videoId), videoId },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
