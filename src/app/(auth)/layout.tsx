import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-foreground p-10 text-background lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <Link href="/" className="relative z-10 text-lg font-heading font-semibold tracking-tight">
          ASCEND
        </Link>
        <div className="relative z-10 max-w-sm">
          <p className="font-heading text-3xl leading-snug">
            Start from zero. Understand the concepts. Build real things.
          </p>
          <p className="mt-4 text-sm text-background/60">
            A living map of AI, ML, and the tools to build with them — explained
            so it actually makes sense.
          </p>
        </div>
        <p className="relative z-10 text-xs text-background/40">
          Learn. Understand. Build.
        </p>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
