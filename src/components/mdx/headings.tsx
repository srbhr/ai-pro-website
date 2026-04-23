import GithubSlugger from "github-slugger";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return extractText((node as any).props?.children);
  }
  return "";
}

/**
 * Each MDXContent render gets a fresh slugger so duplicate headings in the same
 * page get -2, -3 suffixes but don't collide across pages.
 */
export function createHeadingComponents() {
  const slugger = new GithubSlugger();
  slugger.reset();

  return {
    h2: ({ children, id, ...props }: ComponentPropsWithoutRef<"h2">) => {
      const resolvedId = id ?? slugger.slug(extractText(children));
      return (
        <h2 id={resolvedId} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, id, ...props }: ComponentPropsWithoutRef<"h3">) => {
      const resolvedId = id ?? slugger.slug(extractText(children));
      return (
        <h3 id={resolvedId} {...props}>
          {children}
        </h3>
      );
    },
  };
}
