import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  emoji: string;
  author: string;
}

export function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDirectory, "blog");
  ensureDirectoryExists(blogDir);

  const fileNames = fs.readdirSync(blogDir);
  const posts: BlogPost[] = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data, content } = matter(fileContents);
      
      const contentParagraphs = content
        .split("\n\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      return {
        slug,
        title: data.title || "Untitled Post",
        excerpt: data.excerpt || "",
        category: data.category || "General",
        date: data.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: data.readTime || "5 min",
        emoji: data.emoji || "📝",
        author: data.author || "Dr. Ajith Madhav",
        content: contentParagraphs,
      };
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const blogDir = path.join(contentDirectory, "blog");
    const fullPath = path.join(blogDir, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const contentParagraphs = content
      .split("\n\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    return {
      slug,
      title: data.title || "Untitled Post",
      excerpt: data.excerpt || "",
      category: data.category || "General",
      date: data.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: data.readTime || "5 min",
      emoji: data.emoji || "📝",
      author: data.author || "Dr. Ajith Madhav",
      content: contentParagraphs,
    };
  } catch (error) {
    return null;
  }
}
