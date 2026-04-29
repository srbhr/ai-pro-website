import { Shader } from "@/components/shader/Shader";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function BigCTA() {
  return (
    <div className="mx-auto max-w-[1240px] px-8">
      <div className="chrome relative mt-[72px] overflow-hidden rounded-2xl px-10 py-[72px] text-center">
        <Shader
          variant="caustics"
          seed={10}
          className="absolute inset-0 z-0 opacity-[0.55]"
        />
        <div className="relative z-[2]">
          <h3
            className="font-serif m-0 mb-4 text-[clamp(32px,4.2vw,52px)] font-light leading-none tracking-[-0.025em]"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            Writing that respects
            <br />
            your <span className="italic">attention span.</span>
          </h3>
          <p className="mx-auto mb-7 max-w-[460px] text-[15px] text-ink-2">
            No newsletter pop-ups. No login. Just the essays — open on any device, dark or
            light, as long as you have coffee.
          </p>
          <ButtonLink href="#blogs" variant="primary" icon="→">
            Read the blogs
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
