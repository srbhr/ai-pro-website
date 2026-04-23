import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type NavVariant = "landing" | "about" | "blog";

export function Header({ variant = "landing" }: { variant?: NavVariant }) {
  const blogsHref = variant === "landing" ? "#blogs" : "/#blogs";

  return (
    <header className="sticky top-0 z-[60] border-b border-hair backdrop-blur-md bg-[color-mix(in_oklab,var(--bg),transparent_35%)] backdrop-saturate-[1.4]">
      <div className="wrap flex h-14 items-center justify-between">
        <nav className="flex items-center gap-[22px]">
          <Link href={blogsHref} className={`nav-link ${variant === "blog" ? "active" : ""}`}>
            Read blogs
          </Link>
          <Link href="/about" className={`nav-link ${variant === "about" ? "active" : ""}`}>
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
