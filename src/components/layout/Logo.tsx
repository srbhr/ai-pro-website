import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      aria-label="AI Pro — home"
      className="inline-flex items-center gap-2.5 text-ink"
    >
      <b className="text-[15px] font-medium uppercase tracking-[0.14em] not-italic">
        AI&nbsp;
        <em className="font-serif text-[18px] font-normal italic tracking-[-0.01em] normal-case">
          Pro
        </em>
      </b>
      <span className="logo-mark" aria-hidden />
    </Link>
  );
}
