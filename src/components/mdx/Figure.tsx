import type { ReactNode } from "react";

type FigureProps = {
  caption: string;
  children: ReactNode;
};

export function Figure({ caption, children }: FigureProps) {
  return (
    <figure className="chrome my-10 overflow-hidden rounded-xl">
      <div className="relative overflow-hidden bg-bg-2 aspect-[16/8]">{children}</div>
      <figcaption className="font-mono border-t border-hair bg-card px-4 py-3 text-[11px] uppercase tracking-[0.1em] text-ink-3">
        {caption}
      </figcaption>
    </figure>
  );
}
