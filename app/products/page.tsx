// ---------------------------------------------------------------------------
// /products — All Products page
// Server Component — no "use client" needed
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/product-utils";
import { whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Products | Afan Mac Store",
  description:
    "Browse all Apple products at Afan Mac Store — MacBooks, iPhones, iPads, accessories, and more. Message us on WhatsApp for current availability.",
};

const ALL_PRODUCTS_WHATSAPP =
  "Hi Afan Mac Store, I'd like to browse your products. Please share what's currently available.";

export default function AllProductsPage() {
  const products = getAllProducts();

  return (
    <main>
      {/* ── Page header ── */}
      <section
        className="w-full bg-[#F5F5F7]"
        style={{
          paddingTop: "clamp(64px, 8vw, 96px)",
          paddingBottom: "clamp(20px, 2.5vw, 32px)",
        }}
        aria-labelledby="all-products-heading"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          {/* Overline */}
          <p
            className="uppercase font-semibold tracking-[0.10em]"
            style={{ fontSize: "11px", color: "#AEAEB2", marginBottom: "8px" }}
          >
            Products
          </p>

          {/* h1 */}
          <h1
            id="all-products-heading"
            className="font-semibold text-[#1D1D1F] leading-[1.08] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
              maxWidth: "640px",
              marginBottom: "12px",
              letterSpacing: "normal",
            }}
          >
            All Products at Afan Mac Store
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(1rem, 1.25vw + 0.125rem, 1.25rem)",
              color: "#6E6E73",
              maxWidth: "560px",
              marginBottom: "28px",
              lineHeight: 1.5,
              letterSpacing: "normal",
              wordSpacing: "normal",
            }}
          >
            Browse MacBooks, iPhones, iPads, accessories, and more. Message us
            on WhatsApp for current availability.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={whatsappLink(ALL_PRODUCTS_WHATSAPP)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ask about products on WhatsApp"
            className="inline-flex items-center gap-[6px] rounded-full min-h-[44px] px-6 text-[15px] font-semibold no-underline tracking-normal bg-[#25D366] text-white hover:bg-[#1DAE56] transition-colors duration-[180ms] ease focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
          >
            <MessageCircle
              size={16}
              aria-hidden="true"
              focusable="false"
              strokeWidth={2}
            />
            Ask on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section
        className="w-full bg-[#F5F5F7]"
        style={{
          paddingTop: "clamp(28px, 3.5vw, 48px)",
          paddingBottom: "clamp(64px, 8vw, 96px)",
        }}
        aria-label="All products"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
