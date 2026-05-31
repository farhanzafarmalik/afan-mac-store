"use client";

// ---------------------------------------------------------------------------
// sections/Location.tsx — Phase 9B
// ---------------------------------------------------------------------------
// Displays real Head Office and Sub Office location cards.
// No map embed, no Google logo, no fake map screenshot, no external images.
// ---------------------------------------------------------------------------

import { useState } from "react";
import {
  Building2,
  MapPin,
  Clock,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { LOCATIONS, type Location } from "@/data/locations";

// ---------------------------------------------------------------------------
// LocationCard
// ---------------------------------------------------------------------------
function LocationCard({ location }: { location: Location }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "18px",
        border: `1px solid ${hovered ? "#D2D2D7" : "#E8E8ED"}`,
        boxShadow: hovered
          ? "0 2px 10px rgba(0,0,0,0.07)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        padding: "24px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition:
          "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Office badge */}
      <div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 500,
            color: "#6E6E73",
            backgroundColor: "#F5F5F7",
            border: "1px solid #E8E8ED",
            borderRadius: "9999px",
            padding: "4px 10px",
            letterSpacing: "normal",
          }}
        >
          <Building2
            size={13}
            aria-hidden="true"
            focusable="false"
            color="#6E6E73"
          />
          {location.label}
        </span>
      </div>

      {/* Address */}
      <div
        style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
      >
        <MapPin
          size={18}
          aria-hidden="true"
          focusable="false"
          color="#6E6E73"
          style={{ marginTop: "1px", flexShrink: 0 }}
        />
        <p
          style={{
            fontSize: "15px",
            color: "#1D1D1F",
            lineHeight: 1.5,
            letterSpacing: "normal",
            margin: 0,
          }}
        >
          {location.address}
        </p>
      </div>

      {/* Business hours — Head Office only */}
      {location.hours && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <Clock
              size={16}
              aria-hidden="true"
              focusable="false"
              color="#6E6E73"
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#1D1D1F",
                letterSpacing: "normal",
              }}
            >
              Business Hours
            </span>
          </div>
          <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
            {location.hours.map((row) => (
              <div
                key={row.days}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px max-content",
                  gap: "8px",
                }}
              >
                <dt
                  style={{
                    fontSize: "13px",
                    color: "#6E6E73",
                    letterSpacing: "normal",
                  }}
                >
                  {row.days}
                </dt>
                <dd
                  style={{
                    fontSize: "13px",
                    color: row.closed ? "#AEAEB2" : "#1D1D1F",
                    fontWeight: row.closed ? 400 : 500,
                    letterSpacing: "normal",
                    whiteSpace: "nowrap",
                    margin: 0,
                  }}
                >
                  {row.hours}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Sub Office visit note — shown when no hours provided */}
      {!location.hours && (
        <p
          style={{
            fontSize: "13px",
            color: "#6E6E73",
            letterSpacing: "normal",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Contact us on WhatsApp before visiting.
        </p>
      )}

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "4px",
        }}
      >
        {/* Open in Google Maps — Head Office only (no URL for Sub Office) */}
        {location.mapsUrl && (
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Head Office location in Google Maps"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              minHeight: "44px",
              borderRadius: "9999px",
              border: "1.5px solid #0071E3",
              color: "#0071E3",
              backgroundColor: "transparent",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "normal",
              padding: "0 20px",
              transition: "background-color 0.15s ease",
            }}
            className="hover:bg-[rgba(0,113,227,0.06)] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
          >
            <Navigation
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
            Open in Google Maps
          </a>
        )}

        {/* WhatsApp CTA */}
        <a
          href={whatsappLink(location.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            location.isPrimary
              ? "Chat on WhatsApp before visiting Head Office"
              : "Chat on WhatsApp about Sub Office visit"
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            minHeight: "44px",
            borderRadius: "9999px",
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            fontSize: "15px",
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "normal",
            padding: "0 20px",
            transition: "background-color 0.15s ease",
          }}
          className="hover:bg-[#1DAE56] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
        >
          <MessageCircle
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          />
          {location.isPrimary ? "WhatsApp Before Visiting" : "Chat on WhatsApp"}
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Location section
// ---------------------------------------------------------------------------
export default function Location() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      style={{ backgroundColor: "#F5F5F7" }}
    >
      <div
        className="px-4 md:px-8"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "clamp(64px, 8vw, 96px)",
          paddingBottom: "clamp(28px, 4vw, 48px)",
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
            Location
          </p>
          <h2
            id="location-heading"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 3rem)",
              fontWeight: 600,
              color: "#1D1D1F",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 12px",
            }}
          >
            Visit Afan Mac Store.
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
            Find us at our Rawalpindi head office or contact us before visiting
            for current product availability.
          </p>
        </div>

        {/* 2-column card grid — 1-col mobile, 2-col tablet/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {LOCATIONS.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
    </section>
  );
}
