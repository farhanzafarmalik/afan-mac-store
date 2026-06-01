"use client";

// ---------------------------------------------------------------------------
// sections/Reviews.tsx — Phase 22A
// ---------------------------------------------------------------------------
// Real Google Business review excerpts only.
// No invented names, no invented text, no profile photos, no Google logo.
// Source: Afan Mac Store Google Business profile (4.9 rating, 32 reviews)
// ---------------------------------------------------------------------------

import { useRef, useState } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";
import { REVIEWS, type Review } from "@/data/reviews";
import { whatsappLink } from "@/lib/constants";

// ---------------------------------------------------------------------------
// TrustPill — compact 4.9 / 32-reviews summary near heading
// ---------------------------------------------------------------------------
function TrustPill() {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px 20px",
        backgroundColor: "#FFFFFF",
        borderRadius: "18px",
        border: "1px solid #E8E8ED",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        flexShrink: 0,
      }}
    >
      {/* Stars + score */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <div
          aria-label="4.9 out of 5 stars"
          style={{ display: "flex", gap: "2px" }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              fill="#FF9F0A"
              color="#FF9F0A"
              strokeWidth={0}
              aria-hidden="true"
              focusable="false"
            />
          ))}
        </div>
        <span
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#1D1D1F",
            letterSpacing: "-0.01em",
          }}
        >
          4.9
        </span>
        <span
          style={{
            fontSize: "13px",
            color: "#6E6E73",
            letterSpacing: "normal",
          }}
        >
          out of 5
        </span>
      </div>

      {/* Source line */}
      <p
        style={{
          fontSize: "12px",
          color: "#6E6E73",
          letterSpacing: "normal",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        Based on 32 Google Business reviews
      </p>

      {/* CTA — small blue text action */}
      <a
        href="https://share.google/6cVrQ5nQXhac0z4S2"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Google reviews for Afan Mac Store"
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "#0071E3",
          textDecoration: "none",
          letterSpacing: "normal",
          display: "inline-block",
        }}
        className="hover:underline hover:[text-underline-offset:2px]"
      >
        View Google reviews →
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ReviewCard — entrance animation + subtle desktop hover lift
// ---------------------------------------------------------------------------
interface ReviewCardProps {
  review: Review;
  index: number;
  inView: boolean;
}

function ReviewCard({ review, index, inView }: ReviewCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.36, ease: "easeOut", delay: index * 0.04 }}
      whileHover={{
        y: -3,
        transition: { duration: 0.22, ease: "easeOut", delay: 0 },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "18px",
        border: `1px solid ${hovered ? "#D2D2D7" : "#E8E8ED"}`,
        boxShadow: hovered
          ? "0 4px 16px rgba(0,0,0,0.08)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Stars — 5 filled */}
      <div aria-label="5 out of 5 stars" style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill="#FF9F0A"
            color="#FF9F0A"
            strokeWidth={0}
            aria-hidden="true"
            focusable="false"
          />
        ))}
      </div>

      {/* Review text — darker, more confident */}
      <p
        style={{
          fontSize: "15px",
          fontWeight: 400,
          color: "#1D1D1F",
          lineHeight: 1.65,
          letterSpacing: "normal",
          margin: 0,
          flex: 1,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer info + source */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          paddingTop: "10px",
          borderTop: "1px solid #F5F5F7",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#1D1D1F",
            letterSpacing: "normal",
            display: "block",
          }}
        >
          {review.name}
        </span>
        <span
          style={{
            fontSize: "12px",
            color: "#6E6E73",
            letterSpacing: "normal",
            display: "block",
          }}
        >
          {review.label}
        </span>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Reviews section
// ---------------------------------------------------------------------------
export default function Reviews() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });

  const ctaMessage =
    "Hi Afan Mac Store, I came across your reviews and would like to ask about product availability.";

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div
          className="px-4 md:px-8"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingTop: "clamp(64px, 8vw, 96px)",
            paddingBottom: "clamp(64px, 8vw, 96px)",
          }}
        >
          {/* ── Section header — desktop: heading left + trust pill right ── */}
          <div
            className="flex flex-col md:flex-row md:justify-between md:items-start"
            style={{
              gap: "clamp(24px, 3vw, 32px)",
              marginBottom: "clamp(40px, 5vw, 56px)",
            }}
          >
            {/* Left: eyebrow + heading + subtitle */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: "#AEAEB2",
                  margin: "0 0 12px",
                }}
              >
                Customer Reviews
              </p>
              <h2
                id="reviews-heading"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 3rem)",
                  fontWeight: 600,
                  color: "#1D1D1F",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: "0 0 12px",
                }}
              >
                Trusted by Apple buyers in Pakistan.
              </h2>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.25vw + 0.125rem, 1.25rem)",
                  color: "#6E6E73",
                  maxWidth: "520px",
                  letterSpacing: "normal",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Real customer feedback from Afan Mac Store&apos;s Google
                Business reviews.
              </p>
            </div>

            {/* Right: trust pill */}
            <TrustPill />
          </div>

          {/* ── Review grid — 1 col mobile / 2 col tablet / 3 col desktop ── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {REVIEWS.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={index}
                inView={inView}
              />
            ))}
          </div>

          {/* ── CTA row — WhatsApp fallback (no real Google review link exists) ── */}
          <div
            style={{
              marginTop: "clamp(40px, 5vw, 52px)",
              paddingTop: "clamp(32px, 4vw, 40px)",
              borderTop: "1px solid #E8E8ED",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#6E6E73",
                letterSpacing: "normal",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Have questions? Our team responds fast on WhatsApp.
            </p>
            <a
              href={whatsappLink(ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ask about availability on WhatsApp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "44px",
                padding: "0 24px",
                borderRadius: "9999px",
                border: "1.5px solid #25D366",
                backgroundColor: "transparent",
                color: "#1D1D1F",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "normal",
                textDecoration: "none",
                transition: "background-color 0.18s ease, color 0.18s ease",
              }}
              className="hover:bg-[#25D366] hover:text-white focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle size={16} aria-hidden="true" focusable="false" strokeWidth={2} />
              Ask about availability on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
