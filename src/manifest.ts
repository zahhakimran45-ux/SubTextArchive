import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Subtext",
    short_name: "Subtext",
    description:
      "Private conversation intelligence with the Afterthought personal memory archive.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#121117",
    theme_color: "#121117",
    categories: ["productivity", "lifestyle", "utilities"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
