import { BlogCard } from "./BlogCard";
import { AgentGraph } from "./covers/AgentGraph";
import { AttentionMatrix } from "./covers/AttentionMatrix";
import { CudaCode } from "./covers/CudaCode";
import { EmbeddingCloud } from "./covers/EmbeddingCloud";
import { RagDiagram } from "./covers/RagDiagram";

export function BlogGrid() {
  return (
    <section id="blogs" className="relative pt-[120px] pb-[80px]">
      <div className="wrap">
        <div className="mb-12 flex items-end justify-between gap-8">
          <h2 className="font-serif m-0 max-w-[680px] text-[clamp(34px,4.5vw,56px)] font-light leading-none tracking-[-0.025em]">
            Recent <span className="italic">writing</span>, picked
            <br />
            for the curious engineer.
          </h2>
          <div className="font-mono whitespace-nowrap pb-2.5 text-[11.5px] uppercase tracking-[0.14em] text-ink-3">
            27 essays · 4 series · updated weekly
          </div>
        </div>

        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-5 max-[960px]:grid-cols-1">
          <BlogCard
            feature
            href="/blog/self-attention-by-hand"
            tag="Series · Transformers"
            seriesBadge="01/06"
            title={
              <>
                A slow walk through self-attention,{" "}
                <span className="italic font-light">done by hand.</span>
              </>
            }
            summary={
              <>
                We derive the attention operator from scratch — queries, keys, values, the
                softmax trick and why √d<sub>k</sub> shows up. Then we implement it in 40 lines
                of numpy and compare against a production kernel. No hand-waving.
              </>
            }
            meta="24 MIN READ · APR 18"
            readLabel="Open essay"
            cover={<AttentionMatrix seed={1} />}
          />

          <BlogCard
            href="/blog/build-your-own-embedding-model"
            tag="Tutorial · Embeddings"
            title={
              <>
                Build your own <span className="italic font-light">embedding model</span> in a
                weekend.
              </>
            }
            summary={
              <>
                Contrastive objectives, hard negatives, and when <em>not</em> to reach for a
                frontier API.
              </>
            }
            meta="18 MIN · APR 11"
            cover={<EmbeddingCloud seed={2} />}
          />

          <BlogCard
            href="/blog/reading-cuda-without-flinching"
            tag="Deep-dive · CUDA"
            title={
              <>
                Reading a <span className="italic font-light">CUDA kernel</span> without
                flinching.
              </>
            }
            summary="Warps, tiles, shared memory, and the one mental model that finally made it click."
            meta="22 MIN · APR 04"
            cover={<CudaCode />}
          />

          <BlogCard
            href="/blog/long-horizon-agents-drift"
            tag="Essay · Agents"
            title={
              <>
                Why <span className="italic font-light">long-horizon</span> agents still drift.
              </>
            }
            summary="A post-mortem of six failure modes, with receipts from production traces."
            meta="14 MIN · MAR 28"
            cover={<AgentGraph />}
          />

          <BlogCard
            href="/blog/rag-that-actually-retrieves"
            tag="Playbook · RAG"
            title={
              <>
                RAG that <span className="italic font-light">actually</span> retrieves.
              </>
            }
            summary="A honest playbook: chunking that works, rerankers worth the latency, eval you can trust."
            meta="20 MIN · MAR 22"
            cover={<RagDiagram />}
          />
        </div>
      </div>
    </section>
  );
}
