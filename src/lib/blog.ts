import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export async function listPosts(): Promise<PostMeta[]> {
  const entries = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    entries
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
        const { data } = matter(raw);
        return {
          slug,
          title: String(data.title ?? slug),
          description: String(data.description ?? ""),
          date: String(data.date ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        } satisfies PostMeta;
      }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function listSlugs(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIR);
  return entries.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}
