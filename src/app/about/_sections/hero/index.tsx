import { Grain } from "@/components/shader/Grain";
import { Shader } from "@/components/shader/Shader";

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden pt-[120px] pb-[80px]">
      <Shader
        variant="caustics"
        seed={0}
        className="absolute -inset-[10%] z-0"
      />
      <Grain />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px z-[1] h-[180px] bg-[linear-gradient(180deg,transparent,var(--bg))]"
      />

      <div className="wrap relative z-[2] max-w-[820px]">
        <div className="font-mono mb-[22px] inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
          <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
          <span>The people · the principles</span>
        </div>

        <h1
          className="font-serif m-0 mb-7 text-[clamp(48px,7vw,96px)] font-light leading-[0.98] tracking-[-0.03em] text-balance"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          A small crew, <span className="italic font-normal">writing slowly,</span> about things
          that last.
        </h1>

        <p
          className="font-serif m-0 max-w-[620px] text-[clamp(18px,2.2vw,24px)] font-light leading-[1.45] text-ink-2 text-pretty"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          AI Pro is an independent publication. Three writers and a rotating cast of guest
          contributors, all practitioners — shipping models, debugging kernels, running the
          on-call pager — who take the time to write down what they learn.
        </p>
      </div>
    </section>
  );
}
