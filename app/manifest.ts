import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Nuxron - Computational Biology Platform",
        short_name: "Nuxron",
        description:
            "Free, anonymous, no-signup computational biology platform. Edit sequences, simulate protein folding, and visualize genomic data directly in your browser.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
