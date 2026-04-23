const NAMES = [
  "Lena Okafor",
  "Yui Tanaka",
  "Miguel Reyes",
  "Ishaan Desai",
  "Nadia Haddad",
  "Ben Ostrowski",
  "Ayako Morii",
  "Theo Laurent",
];

export function Contributors() {
  return (
    <div className="chrome mt-16 flex flex-wrap items-center gap-7 rounded-2xl px-7 py-6">
      <span className="font-mono relative z-[2] whitespace-nowrap text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        Guest contributors
      </span>
      <div
        className="font-serif relative z-[2] flex-1 text-[18px] font-light leading-[1.5] text-ink"
        style={{ fontVariationSettings: '"opsz" 60' }}
      >
        {NAMES.map((name, i) => (
          <span key={name}>
            <a
              href="#"
              className="underline decoration-hair decoration-1 underline-offset-[3px] transition-[text-decoration-color] hover:decoration-accent"
            >
              {name}
            </a>
            {i < NAMES.length - 1 ? " · " : " "}
          </span>
        ))}
        <em className="italic font-normal">
          — and whoever has something worth writing down next.
        </em>
      </div>
    </div>
  );
}
