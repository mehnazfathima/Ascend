import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <svg width="112" height="112" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 15 L47 44 L38.5 44 L32 30.5 L25.5 44 L17 44 Z" fill="#fff0e7" />
        </svg>
      </div>
    ),
    size
  );
}
