import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "default" | "primary" | "ghost";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
};

const buttonBase =
  "group inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-[11px] border-0 px-5 text-[13.5px] font-medium tracking-[0.01em] transition-[transform,background-color,color] duration-150 hover:-translate-y-px";

const buttonVariants: Record<ButtonVariant, string> = {
  default: "bg-card text-ink",
  primary: "bg-ink text-bg hover:bg-[color-mix(in_oklab,var(--ink),var(--accent)_8%)]",
  ghost: "bg-transparent text-ink-2 hover:text-ink",
};

const iconClassName =
  "grid h-[18px] w-[18px] place-items-center rounded bg-accent text-accent-ink transition-transform duration-200 group-hover:translate-x-[3px]";

export function ButtonLink({
  href,
  variant = "default",
  icon,
  children,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = clsx(buttonBase, buttonVariants[variant], className);
  const content = (
    <>
      {icon && <span className={iconClassName}>{icon}</span>}
      {children}
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
