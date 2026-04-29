import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type NavVariant = "landing" | "about" | "blog";

function navLinkClassName(active: boolean) {
  return `relative px-0.5 py-1.5 text-[12.5px] tracking-[0.04em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 ${
    active
      ? "text-ink before:mr-1.5 before:text-[7px] before:text-accent before:content-['◆']"
      : "text-ink-2"
  }`;
}

export function Header({ variant = "landing" }: { variant?: NavVariant }) {
  const blogsHref = variant === "landing" ? "#blogs" : "/#blogs";

  return (
    <header className="sticky top-0 z-[60] border-b border-hair backdrop-blur-md bg-[color-mix(in_oklab,var(--bg),transparent_35%)] backdrop-saturate-[1.4]">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-8">
        <nav className="flex items-center gap-[22px]">
          <Link href={blogsHref} className={navLinkClassName(variant === "blog")}>
            Read blogs
          </Link>
          <Link href="/about" className={navLinkClassName(variant === "about")}>
            About
          </Link>
        </nav>
        <div className="flex-1" />
        <ThemeToggle />
        <div className="ml-2">
          <Logo />
        </div>
      </div>
    </header>
  );
}
