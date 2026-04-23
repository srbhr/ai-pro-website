import type { ReactNode } from "react";

type CalloutProps = {
  label?: string;
  children: ReactNode;
};

export function Callout({ label = "Note", children }: CalloutProps) {
  return (
    <aside className="chrome my-8 flex gap-3.5 rounded-xl px-[22px] py-[18px] text-[15px] text-ink-2">
      <span className="font-mono shrink-0 self-start rounded bg-accent px-2 py-1 text-[10.5px] uppercase tracking-[0.14em] text-accent-ink">
        {label}
      </span>
      <div className="relative z-[2]">{children}</div>
    </aside>
  );
}
