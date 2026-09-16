import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

const ALLOWED_SIZES = [192, 512] as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeParam } = await params;
  const size = Number(sizeParam);
  if (!ALLOWED_SIZES.includes(size as (typeof ALLOWED_SIZES)[number])) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Mark scaled to ~55% of the canvas, well inside the ~80% safe zone
  // maskable icons need so it survives circular/rounded-square cropping.
  const markSize = Math.round(size * 0.55);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#00686d",
        }}
      >
        <svg
          width={markSize}
          height={markSize}
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 15 L47 44 L38.5 44 L32 30.5 L25.5 44 L17 44 Z" fill="#fff0e7" />
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
