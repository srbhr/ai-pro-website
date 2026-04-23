import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { Figure } from "./Figure";
import { createHeadingComponents } from "./headings";

export function getMdxComponents(): MDXComponents {
  return {
    ...createHeadingComponents(),
    Callout,
    Figure,
  };
}

// Static registry for shortcodes only (no heading slugger here — needs per-render state)
export const mdxComponents: MDXComponents = {
  Callout,
  Figure,
};
