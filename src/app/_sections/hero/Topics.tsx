const TOPICS = [
  "Transformers",
  "Embeddings",
  "RAG",
  "CUDA",
  "Agents",
  "Fine-tuning",
  "Systems",
];

export function Topics() {
  return (
    <div className="font-mono relative z-[2] mt-[84px] flex flex-wrap justify-center gap-6 text-[11.5px] uppercase tracking-[0.12em] text-ink-3">
      {TOPICS.map((t) => (
        <span key={t} className="inline-flex items-center gap-2">
          <span aria-hidden className="text-[8px] text-accent">
            ◆
          </span>
          {t}
        </span>
      ))}
    </div>
  );
}
