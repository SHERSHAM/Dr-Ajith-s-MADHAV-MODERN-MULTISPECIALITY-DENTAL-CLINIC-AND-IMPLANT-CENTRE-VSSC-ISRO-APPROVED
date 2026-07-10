import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/cms";

export async function GET(req: NextRequest) {
  try {
    const posts = getBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error("Fetch blog posts error:", error);
    return NextResponse.json(
      { error: "An error occurred fetching CMS content" },
      { status: 500 }
    );
  }
}
