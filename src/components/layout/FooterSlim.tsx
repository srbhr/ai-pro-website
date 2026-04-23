import Link from "next/link";

export function FooterSlim() {
  return (
    <footer className="font-mono mt-24 border-t border-hair py-9 text-[11px] uppercase tracking-[0.1em] text-ink-3">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <span>© MMXXVI · AI Pro</span>
        <span>
          <Link href="/blog" className="mr-[18px] hover:text-ink">
            Essays
          </Link>
          <a href="#" className="mr-[18px] hover:text-ink">
            Series
          </a>
          <a href="#" className="mr-[18px] hover:text-ink">
            RSS
          </a>
          <Link href="/about" className="mr-[18px] hover:text-ink">
            About
          </Link>
        </span>
        <span>Set in Source Serif &amp; Geist</span>
      </div>
    </footer>
  );
}
