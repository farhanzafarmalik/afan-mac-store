"use client";

// ---------------------------------------------------------------------------
// sections/Reviews.tsx — Phase 8B
// ---------------------------------------------------------------------------
// Real Google Business review excerpts only.
// No invented names, no invented text, no profile photos, no Google logo.
// Source: Afan Mac Store Google Business profile (4.9 rating, 32 reviews)
// ---------------------------------------------------------------------------

import { useRef, useState } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";
import { Star } from "lucide-react";
import { REVIEWS, type Review } from "@/data/reviews";

// ---------------------------------------------------------------------------
// Stats row — real Google Business data only
// ---------------------------------------------------------------------------
const STATS = [
  { value: "4.9", label: "Rating" },
  { value: "32", label: "Reviews" },
  { value: "WhatsApp", label: "Support" },
] as const;

// ---------------------------------------------------------------------------
// ReviewCard — entrance animation + subtle hover lift
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
        y: -2,
        transition: { duration: 0.22, ease: "easeOut", delay: 0 },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "18px",
        border: `1px solid ${hovered ? "#D2D2D7" : "#E8E8ED"}`,
        boxShadow: hovered
          ? "0 2px 10px rgba(0,0,0,0.07)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Stars — 5 filled, amber #FF9F0A */}
      <div aria-label="5 out of 5 stars" style={{ display: "flex", gap: "2px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill="#FF9F0A"
            color="#FF9F0A"
            strokeWidth={0}
            aria-hidden="true"
            focusable="false"
          />
        ))}
      </div>

      {/* Review text */}
      <p
        style={{
          fontSize: "15px",
          color: "#1D1D1F",
          lineHeight: 1.6,
          letterSpacing: "normal",
          margin: 0,
          flex: 1,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer name + label */}
      <div>
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
            color: "#AEAEB2",
            letterSpacing: "normal",
            display: "block",
            marginTop: "2px",
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
          {/* Section header */}
          <div style={{ marginBottom: "clamp(40px, 5vw, 56px)" }}>
            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: "#AEAEB2",
                margin: "0 0 12px",
              }}
            >
              Google Reviews
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
                maxWidth: "560px",
                letterSpacing: "normal",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Real customer feedback from Afan Mac Store&apos;s Google Business
              reviews.
            </p>
          </div>

          {/* Review grid — 1 col mobile / 2 col tablet / 3 col desktop */}
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

          {/* Trust stats row — real Google Business data */}
          <div
            style={{
              marginTop: "clamp(40px, 5vw, 56px)",
              paddingTop: "clamp(32px, 4vw, 40px)",
              borderTop: "1px solid #E8E8ED",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "clamp(24px, 4vw, 48px)",
              flexWrap: "wrap",
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#1D1D1F",
                    letterSpacing: "normal",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6E6E73",
                    letterSpacing: "normal",
                    marginTop: "2px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
