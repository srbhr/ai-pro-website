import { Shader } from "@/components/shader/Shader";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AboutCTA() {
  return (
    <div className="chrome relative mt-20 overflow-hidden rounded-2xl px-10 py-20 text-center">
      <Shader
        variant="caustics"
        seed={240}
        className="absolute inset-0 z-0 opacity-60"
      />
      <div className="relative z-[2]">
        <div className="font-mono mb-[22px] inline-flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-3">
          <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent" />
          <span>Want to write with us?</span>
        </div>
        <h3
          className="font-serif m-0 mb-4 text-[clamp(32px,4.2vw,52px)] font-light leading-none tracking-[-0.025em]"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          Pitch an essay.
          <br />
          We <span className="italic">read everything.</span>
        </h3>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] text-ink-2">
          If you&apos;ve built something hard, debugged something weird, or understood something
          that took a year to understand — we&apos;d love to help you write it down.
        </p>
        <div className="inline-flex gap-2.5">
          <ButtonLink href="mailto:pitch@aipro.dev" variant="primary" icon="→">
            Pitch an essay
          </ButtonLink>
          <ButtonLink href="/blog">
            Read the blogs
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
