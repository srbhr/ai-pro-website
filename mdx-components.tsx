import type { MDXComponents } from "mdx/types";
import { getMdxComponents } from "@/components/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...getMdxComponents(),
  };
}
