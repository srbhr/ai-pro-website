import { MemberCard } from "./MemberCard";

const TwitterIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const WebsiteIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

export function Team() {
  return (
    <section className="pt-[120px] pb-[80px]">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
        <h2
          className="font-serif m-0 max-w-[700px] text-[clamp(36px,5vw,60px)] font-light leading-none tracking-[-0.025em]"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          The <span className="italic">writers.</span>
        </h2>
        <div className="font-mono whitespace-nowrap pb-2.5 text-[11.5px] uppercase tracking-[0.14em] text-ink-3">
          3 authors · 8 contributors · based everywhere
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        <MemberCard
          initials="AM"
          figNumber="FIG.01"
          role="Founder · writes on transformers"
          name={
            <>
              Aarav <span className="italic font-light">Mehta</span>
            </>
          }
          bio="Was training language models when it still felt weird. Writes the slow walkthroughs. Thinks out loud about attention variants, mostly over coffee."
          essays="12 essays"
          shaderVariant="ribbon"
          shaderSeed={0}
          socials={[
            { label: "Twitter", href: "#", svg: TwitterIcon },
            { label: "LinkedIn", href: "#", svg: LinkedInIcon },
            { label: "GitHub", href: "#", svg: GitHubIcon },
          ]}
        />

        <MemberCard
          initials="PK"
          figNumber="FIG.02"
          role="Writes on CUDA & systems"
          name={
            <>
              Priya <span className="italic font-light">Kapoor</span>
            </>
          }
          bio="Systems person. Has shipped more custom kernels than she'd admit at a dinner party. Likes profiler flamegraphs the way other people like crosswords."
          essays="9 essays"
          shaderVariant="field"
          shaderSeed={1}
          socials={[
            { label: "Twitter", href: "#", svg: TwitterIcon },
            { label: "LinkedIn", href: "#", svg: LinkedInIcon },
            { label: "GitHub", href: "#", svg: GitHubIcon },
          ]}
        />

        <MemberCard
          initials="SV"
          figNumber="FIG.03"
          role="Writes on retrieval & agents"
          name={
            <>
              Sofía <span className="italic font-light">Vargas</span>
            </>
          }
          bio={
            <>
              Builds retrieval systems at a company you&apos;ve heard of; writes about the{" "}
              <em>other</em> ninety percent of the job — evaluation, drift, the unglamorous
              plumbing.
            </>
          }
          essays="6 essays"
          shaderVariant="caustics"
          shaderSeed={2}
          socials={[
            { label: "Twitter", href: "#", svg: TwitterIcon },
            { label: "LinkedIn", href: "#", svg: LinkedInIcon },
            { label: "Website", href: "#", svg: WebsiteIcon },
          ]}
        />
      </div>
    </section>
  );
}
