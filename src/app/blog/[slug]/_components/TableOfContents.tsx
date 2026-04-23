"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
          return;
        }
        const scrolled = sections
          .map((s) => ({ id: s.id, top: s.getBoundingClientRect().top }))
          .filter((s) => s.top < 120)
          .sort((a, b) => b.top - a.top);
        if (scrolled[0]) setActiveId(scrolled[0].id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="mb-[34px]">
      <h6 className="font-mono m-0 mb-3.5 text-[10.5px] font-normal uppercase tracking-[0.14em] text-ink-3">
        On this page
      </h6>
      <ul className="m-0 list-none p-0">
        {items.map((it, i) => {
          const active = activeId === it.id;
          return (
            <li
              key={it.id}
              className={`py-1.5 ${i > 0 ? "border-t border-hair" : ""}`}
            >
              <a
                href={`#${it.id}`}
                className={`block py-0.5 text-[12.5px] normal-case tracking-[0.04em] transition-colors ${
                  active ? "text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                {active && (
                  <span
                    aria-hidden
                    className="mr-2 inline-block h-1 w-1 translate-y-[-3px] rounded-full bg-accent align-middle"
                  />
                )}
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
