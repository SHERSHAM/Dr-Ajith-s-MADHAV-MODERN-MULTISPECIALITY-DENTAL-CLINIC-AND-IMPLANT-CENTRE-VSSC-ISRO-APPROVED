import { NextRequest, NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/lib/cms";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("Fetch blog post error:", error);
    return NextResponse.json(
      { error: "An error occurred fetching CMS content" },
      { status: 500 }
    );
  }
}
