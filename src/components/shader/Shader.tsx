import type { CSSProperties } from "react";

export type ShaderVariant = "caustics" | "ribbon" | "field";

type ShaderProps = {
  variant?: ShaderVariant;
  seed?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Placeholder slot. The actual shader system will be wired in later.
 * Positioning is the consumer's responsibility — compose with Tailwind
 * (e.g. `absolute -top-[10%] -right-[5%] -bottom-[20%] -left-[5%]`).
 */
export function Shader({ variant = "caustics", seed = 0, className, style }: ShaderProps) {
  return (
    <div
      aria-hidden
      className={className ? `shader ${className}` : "shader"}
      style={style}
      data-shader-variant={variant}
      data-shader-seed={seed}
    />
  );
}
