import Link from "next/link";

export type NextUpItem = {
  direction: "prev" | "next";
  label: string;
  title: React.ReactNode;
  summary: string;
  href: string;
};

export function NextUp({ items }: { items: NextUpItem[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="chrome block rounded-xl p-[22px] text-ink transition-transform hover:-translate-y-0.5"
        >
          <div className="font-mono relative z-[2] mb-3.5 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
            {it.direction === "prev" && <span className="text-accent">←</span>}
            {it.label}
            {it.direction === "next" && <span className="text-accent">→</span>}
          </div>
          <div className="font-serif relative z-[2] m-0 mb-2 text-[20px] font-normal leading-[1.2] tracking-[-0.01em]">
            {it.title}
          </div>
          <p className="relative z-[2] m-0 text-[13.5px] text-ink-2">{it.summary}</p>
        </Link>
      ))}
    </div>
  );
}
