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
  primaryTag?: string;
  author?: string;
  readTime?: string;
  kicker?: string;
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
          description: String(data.subtitle ?? data.description ?? ""),
          date: String(data.date ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          primaryTag: data.primaryTag ? String(data.primaryTag) : undefined,
          author: data.author ? String(data.author) : undefined,
          readTime: data.readTime ? String(data.readTime) : undefined,
          kicker: data.kicker ? String(data.kicker) : undefined,
        } satisfies PostMeta;
      }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function listSlugs(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIR);
  return entries.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

/** Count posts per tag, sorted descending. */
export function tagCounts(posts: PostMeta[]): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
