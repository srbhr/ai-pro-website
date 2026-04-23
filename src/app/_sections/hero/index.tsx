import Link from "next/link";
import { Grain } from "@/components/shader/Grain";
import { Shader } from "@/components/shader/Shader";
import { Topics } from "./Topics";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[90px] pb-[110px]">
      <Shader
        variant="caustics"
        seed={0}
        className="absolute -top-[10%] -right-[5%] -bottom-[20%] -left-[5%] z-0"
      />
      <Grain />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px z-[1] h-[140px] bg-[linear-gradient(180deg,transparent,var(--bg))]"
      />

      <div className="wrap relative z-[2] mx-auto max-w-[920px] text-center">
        <span className="font-mono mb-7 inline-flex items-center gap-2.5 rounded-full bg-[color-mix(in_oklab,var(--card),transparent_20%)] px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-2">
          <span aria-hidden className="pulse-dot" />
          Issue 14 · new essay every tuesday
        </span>

        <h1
          className="font-serif m-0 mb-7 text-[clamp(46px,8vw,104px)] font-light leading-[0.96] tracking-[-0.035em]"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          Notes from the
          <br />
          <span className="italic font-normal">inside</span> of the machine.
        </h1>

        <p className="mx-auto mb-[38px] max-w-[560px] text-[17.5px] leading-[1.55] text-ink-2 text-pretty">
          Long-form essays, tutorials and teardowns on the models, the math and the production
          code that power modern AI. Written to be read &mdash; not skimmed.
        </p>

        <div className="inline-flex items-center gap-2.5">
          <Link href="#blogs" className="btn btn-primary">
            <span className="arrow">→</span> Read the blogs
          </Link>
          <Link href="/about" className="btn btn-ghost">
            About the publication
          </Link>
        </div>

        <Topics />
      </div>
    </section>
  );
}
