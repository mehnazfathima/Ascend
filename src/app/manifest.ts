import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ASCEND — Learn AI from zero",
    short_name: "ASCEND",
    description:
      "An interactive learning platform that takes you from your first AI concept to building real-world AI projects.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#fff0e7",
    theme_color: "#00686d",
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
