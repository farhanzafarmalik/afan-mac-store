// ---------------------------------------------------------------------------
// /products/[category] — Category Product Listing Page
// Server Component — params is a Promise in Next.js 16; must await it.
// ---------------------------------------------------------------------------
// Approved slugs: macbook · iphone · ipad · mac-mini · imac
//                 apple-watch · airpods · accessories
//
// dynamicParams = false: any slug not in generateStaticParams → 404 automatically.
// No notFound() needed for the slug itself; getCategoryMeta guard handles
// edge cases where the slug exists in params but has no meta entry.
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, PackageSearch } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  getProductsByCategory,
  getCategoryMeta,
} from "@/lib/product-utils";
import { whatsappLink } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Route config
// ---------------------------------------------------------------------------

// Unknown slugs 404 automatically — no dynamic fallback rendering
export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Static params — all 8 approved category slugs
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return [
    { category: "macbook" },
    { category: "iphone" },
    { category: "ipad" },
    { category: "mac-mini" },
    { category: "imac" },
    { category: "apple-watch" },
    { category: "airpods" },
    { category: "accessories" },
  ];
}

// ---------------------------------------------------------------------------
// Metadata — dynamic per category
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryMeta(category);

  if (!meta) {
    return { title: "Not Found | Afan Mac Store" };
  }

  return {
    title: `${meta.h1} | Afan Mac Store`,
    description: meta.subtext,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getCategoryMeta(category);

  // Guard — notFound() returns `never` so TypeScript narrows meta below
  if (!meta) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <main>
      {/* ── Page header ── */}
      <section
        className="w-full bg-[#F5F5F7]"
        style={{
          paddingTop: "clamp(64px, 8vw, 96px)",
          paddingBottom: "clamp(20px, 2.5vw, 32px)",
        }}
        aria-labelledby="category-heading"
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
            id="category-heading"
            className="font-semibold text-[#1D1D1F] leading-[1.08] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
              maxWidth: "640px",
              marginBottom: "12px",
              letterSpacing: "normal",
            }}
          >
            {meta.h1}
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
            {meta.subtext}
          </p>

          {/* Category-level WhatsApp CTA */}
          <a
            href={whatsappLink(meta.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask about ${meta.name} on WhatsApp`}
            className="inline-flex items-center gap-[6px] rounded-full min-h-[44px] px-6 text-[15px] font-semibold no-underline tracking-normal bg-[#25D366] text-white hover:bg-[#1DAE56] transition-colors duration-[180ms] ease focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
          >
            <MessageCircle
              size={16}
              aria-hidden="true"
              focusable="false"
              strokeWidth={2}
            />
            Ask about {meta.name} on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Product grid or empty state ── */}
      <section
        className="w-full bg-[#F5F5F7]"
        style={{
          paddingTop: "clamp(28px, 3.5vw, 48px)",
          paddingBottom: "clamp(64px, 8vw, 96px)",
        }}
        aria-label={`${meta.name} products`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          {products.length > 0 ? (
            // ── Product grid ──
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // ── Empty state ──
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                maxWidth: 400,
                margin: "0 auto",
                padding: "clamp(64px, 8vw, 96px) 0",
                gap: 16,
              }}
            >
              <PackageSearch
                size={48}
                color="#AEAEB2"
                aria-hidden="true"
                focusable="false"
                strokeWidth={1.5}
              />
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#1D1D1F",
                  margin: 0,
                  letterSpacing: "normal",
                }}
              >
                Nothing listed yet.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#6E6E73",
                  lineHeight: 1.5,
                  margin: 0,
                  letterSpacing: "normal",
                  wordSpacing: "normal",
                }}
              >
                Current availability changes quickly. Message us on WhatsApp
                for latest options.
              </p>
              <a
                href={whatsappLink(meta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message us about ${meta.name} on WhatsApp`}
                className="inline-flex items-center gap-[6px] rounded-full min-h-[44px] px-6 text-[15px] font-semibold no-underline tracking-normal bg-[#25D366] text-white hover:bg-[#1DAE56] transition-colors duration-[180ms] ease focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <MessageCircle
                  size={16}
                  aria-hidden="true"
                  focusable="false"
                  strokeWidth={2}
                />
                Message us on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
