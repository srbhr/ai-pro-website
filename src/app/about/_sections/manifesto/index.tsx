export function Manifesto() {
  return (
    <div className="grid grid-cols-[280px_1fr] gap-16 pt-[80px] pb-[40px] max-[800px]:grid-cols-1 max-[800px]:gap-6">
      <h2 className="font-mono m-0 mt-1.5 text-[11px] font-normal uppercase tracking-[0.14em] text-ink-3">
        What we&apos;re
        <br />
        doing here
      </h2>
      <div
        className="font-serif max-w-[720px] text-[28px] font-light leading-[1.3] tracking-[-0.015em] text-ink text-pretty"
        style={{ fontVariationSettings: '"opsz" 60' }}
      >
        <p className="m-0 mb-4">
          We believe most AI writing online is too fast, too short, and too impressed with
          itself. We&apos;re trying to do the opposite: essays that are{" "}
          <em className="italic font-normal">long enough to say something true</em>, with code
          you can actually run and math we&apos;ve checked by hand.
        </p>
        <p className="m-0">
          No sponsors. No paywall. No newsletter pop-ups. The only thing we&apos;re selling is
          our attention to the subject, and yours in return.
        </p>
      </div>
    </div>
  );
}
