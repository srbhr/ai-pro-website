import type { ReactNode } from "react";
import { Shader } from "@/components/shader/Shader";
import type { ShaderVariant } from "@/components/shader/Shader";

type Social = { label: string; href: string; svg: ReactNode };

type MemberCardProps = {
  initials: string;
  figNumber: string;
  role: ReactNode;
  name: ReactNode;
  bio: ReactNode;
  essays: string;
  socials: Social[];
  shaderVariant?: ShaderVariant;
  shaderSeed?: number;
};

export function MemberCard({
  initials,
  figNumber,
  role,
  name,
  bio,
  essays,
  socials,
  shaderVariant = "caustics",
  shaderSeed = 0,
}: MemberCardProps) {
  return (
    <article className="chrome flex min-h-[380px] flex-col rounded-2xl p-[22px] transition-transform duration-[250ms] hover:-translate-y-[3px]">
      <div className="relative z-[2] mb-[22px] overflow-hidden rounded-lg bg-bg-2 aspect-[5/4]">
        <Shader variant={shaderVariant} seed={shaderSeed} className="absolute inset-0 z-0" />
        <div
          aria-hidden
          className="font-mono absolute bottom-3 left-[14px] z-[1] text-[10px] uppercase tracking-[0.14em] text-ink-3"
        >
          PORTRAIT · {figNumber}
        </div>
        <div
          aria-hidden
          className="font-serif absolute bottom-2.5 right-[14px] z-[1] text-[56px] font-light italic leading-none text-ink opacity-85"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          {initials}
        </div>
      </div>

      <div className="font-mono relative z-[2] mb-2.5 inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
        {role}
      </div>

      <h3
        className="font-serif relative z-[2] m-0 mb-2.5 text-[26px] font-normal leading-[1.1] tracking-[-0.015em]"
        style={{ fontVariationSettings: '"opsz" 60' }}
      >
        {name}
      </h3>

      <p className="relative z-[2] m-0 mb-5 text-[13.5px] leading-[1.55] text-ink-2 text-pretty">
        {bio}
      </p>

      <div className="relative z-[2] mt-auto flex items-center justify-between gap-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
          {essays}
        </span>
        <div className="flex gap-1.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="grid h-7 w-7 place-items-center rounded-full bg-bg-2 text-ink-2 transition-colors hover:bg-bg-3 hover:text-ink"
            >
              <span className="block h-[13px] w-[13px]">{s.svg}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
