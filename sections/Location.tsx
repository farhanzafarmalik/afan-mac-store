"use client";

// ---------------------------------------------------------------------------
// sections/Location.tsx — Phase 23A
// ---------------------------------------------------------------------------
// Head Office (primary) with map embed + Sub Office (compact secondary).
// No fake locations, no fabricated coordinates.
// Map embed uses Google Maps search URL for real business name + address.
// ---------------------------------------------------------------------------

import { useState } from "react";
import { Building2, MapPin, Clock, Navigation, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { LOCATIONS } from "@/data/locations";

const headOffice = LOCATIONS.find((l) => l.id === "head-office")!;
const subOffice = LOCATIONS.find((l) => l.id === "sub-office")!;

// Google Maps exact embed — provided by user for Afan Mac Store listing pin.
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.3798526274645!2d73.0533107!3d33.5954474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7ac133962d%3A0xfafdc286f7909dd0!2sAfan%20Mac%20Store!5e0!3m2!1sen!2s!4v1780391862547!5m2!1sen!2s";

// ---------------------------------------------------------------------------
// HeadOfficeCard — primary trust block
// ---------------------------------------------------------------------------
function HeadOfficeCard() {
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
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
      }}
    >
      {/* Badge */}
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
          alignSelf: "flex-start",
        }}
      >
        <Building2 size={13} aria-hidden="true" focusable="false" color="#6E6E73" />
        Head Office
      </span>

      {/* Address */}
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <MapPin
          size={18}
          aria-hidden="true"
          focusable="false"
          color="#6E6E73"
          style={{ marginTop: "2px", flexShrink: 0 }}
        />
        <p style={{ fontSize: "15px", color: "#1D1D1F", lineHeight: 1.5, margin: 0 }}>
          {headOffice.address}
        </p>
      </div>

      {/* Business hours */}
      {headOffice.hours && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <Clock size={16} aria-hidden="true" focusable="false" color="#6E6E73" />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1D1D1F" }}>
              Business Hours
            </span>
          </div>
          <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
            {headOffice.hours.map((row) => (
              <div
                key={row.days}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px max-content",
                  gap: "8px",
                }}
              >
                <dt style={{ fontSize: "13px", color: "#6E6E73" }}>{row.days}</dt>
                <dd
                  style={{
                    fontSize: "13px",
                    color: row.closed ? "#AEAEB2" : "#1D1D1F",
                    fontWeight: row.closed ? 400 : 500,
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

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <a
          href={headOffice.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Head Office in Google Maps"
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
            padding: "0 20px",
            transition: "background-color 0.15s ease",
          }}
          className="hover:bg-[rgba(0,113,227,0.06)] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] focus-visible:outline-none"
        >
          <Navigation size={16} strokeWidth={2} aria-hidden="true" focusable="false" />
          Open Head Office in Maps
        </a>

        <a
          href={whatsappLink(headOffice.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp before visiting Head Office"
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
            padding: "0 20px",
            transition: "background-color 0.15s ease",
          }}
          className="hover:bg-[#1DAE56] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] focus-visible:outline-none"
        >
          <MessageCircle size={16} strokeWidth={2} aria-hidden="true" focusable="false" />
          WhatsApp Before Visiting
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MapCard — Head Office map embed
// ---------------------------------------------------------------------------
function MapCard() {
  return (
    <div
      style={{
        borderRadius: "18px",
        border: "1px solid #E8E8ED",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        backgroundColor: "#F5F5F7",
        /* min-height set via className for responsive */
      }}
      className="min-h-[260px] md:min-h-[320px]"
    >
      <iframe
        src={MAP_EMBED_SRC}
        title="Afan Mac Store Head Office location map"
        width="100%"
        height="100%"
        style={{ border: 0, display: "block", minHeight: "260px" }}
        className="md:min-h-[320px]"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Google Maps showing Afan Mac Store Head Office, Rania Mall, Rawalpindi"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SubOfficeCard — compact secondary card
// ---------------------------------------------------------------------------
function SubOfficeCard() {
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
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
      }}
    >
      {/* Badge */}
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
          alignSelf: "flex-start",
        }}
      >
        <Building2 size={13} aria-hidden="true" focusable="false" color="#6E6E73" />
        Sub Office
      </span>

      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <MapPin
          size={18}
          aria-hidden="true"
          focusable="false"
          color="#6E6E73"
          style={{ marginTop: "2px", flexShrink: 0 }}
        />
        <p style={{ fontSize: "15px", color: "#1D1D1F", lineHeight: 1.5, margin: 0 }}>
          {subOffice.address}
        </p>
      </div>

      <p style={{ fontSize: "13px", color: "#6E6E73", lineHeight: 1.5, margin: 0 }}>
        Contact us on WhatsApp before visiting.
      </p>

      <a
        href={whatsappLink(subOffice.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ask on WhatsApp before visiting Sub Office"
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
          padding: "0 20px",
          transition: "background-color 0.15s ease",
          alignSelf: "flex-start",
        }}
        className="hover:bg-[#1DAE56] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] focus-visible:outline-none w-full sm:w-auto"
      >
        <MessageCircle size={16} strokeWidth={2} aria-hidden="true" focusable="false" />
        Ask Before Visiting
      </a>
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
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Find us at our Rawalpindi head office or contact us before visiting
            for current product availability.
          </p>
        </div>

        {/* Primary row: Head Office card + Map — stacked mobile, side-by-side desktop */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          style={{ marginBottom: "clamp(20px, 3vw, 32px)" }}
        >
          <HeadOfficeCard />
          <MapCard />
        </div>

        {/* Secondary row: Sub Office compact card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubOfficeCard />
        </div>
      </div>
    </section>
  );
}
