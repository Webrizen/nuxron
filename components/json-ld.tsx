export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Nuxron",
        description:
            "Free, anonymous, no-signup computational biology platform. Edit sequences, simulate protein folding, and visualize genomic data directly in your browser.",
        url: "https://nuxron.webrizen.com",
        applicationCategory: "BiotechApplication",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        author: {
            "@type": "Organization",
            name: "Luaucnh Live",
            url: "https://nuxron.webrizen.com",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
