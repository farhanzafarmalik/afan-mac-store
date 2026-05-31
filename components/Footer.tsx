// ---------------------------------------------------------------------------
// components/Footer.tsx — Phase 10B
// ---------------------------------------------------------------------------
// Server Component — no "use client" needed (no interactive state).
// Rendered globally via app/layout.tsx after {children}.
// ---------------------------------------------------------------------------

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Static link data — local constants, no separate data file needed
// ---------------------------------------------------------------------------

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Location", href: "/#location" },
  { label: "Contact", href: "/#contact" },
] as const;

const PRODUCT_LINKS = [
  { label: "MacBook", href: "/products/macbook" },
  { label: "iPhone", href: "/products/iphone" },
  { label: "iPad", href: "/products/ipad" },
  { label: "Mac mini", href: "/products/mac-mini" },
  { label: "iMac", href: "/products/imac" },
  { label: "Apple Watch", href: "/products/apple-watch" },
  { label: "AirPods", href: "/products/airpods" },
  { label: "Accessories", href: "/products/accessories" },
] as const;

interface HoursRow {
  days: string;
  hours: string;
  closed?: boolean;
}

const BUSINESS_HOURS: HoursRow[] = [
  { days: "Mon–Thu", hours: "12 PM – 10 PM" },
  { days: "Friday", hours: "2:30 PM – 10 PM" },
  { days: "Saturday", hours: "12 PM – 10 PM" },
  { days: "Sunday", hours: "Closed", closed: true },
];

const BRAND_WA_MSG =
  "Hi Afan Mac Store, I'm interested in Apple products. Can you guide me?";
const VISIT_WA_MSG =
  "Hi Afan Mac Store, I'd like to get in touch. Can you help me?";
const MAPS_URL = "https://maps.app.goo.gl/iy6teEPKaKBSQJENA";

// ---------------------------------------------------------------------------
// Shared style tokens
// ---------------------------------------------------------------------------

const navLinkStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#6E6E73",
  textDecoration: "none",
  letterSpacing: "normal",
  lineHeight: 1.6,
  display: "block",
};

const colHeadingStyle: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.10em",
  color: "#AEAEB2",
  display: "block",
  marginBottom: "14px",
};

const subLabelStyle: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#AEAEB2",
  display: "block",
  marginBottom: "4px",
};

const addressStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#6E6E73",
  letterSpacing: "normal",
  lineHeight: 1.5,
  margin: "0 0 14px",
};

// ---------------------------------------------------------------------------
// Footer component
// ---------------------------------------------------------------------------

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E8E8ED",
      }}
    >
      <div
        className="px-4 md:px-8"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* ── Main columns ─────────────────────────────────────────────── */}
        <div
          style={{
            paddingTop: "clamp(40px, 5vw, 56px)",
            paddingBottom: "clamp(32px, 4vw, 48px)",
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-8">

            {/* Column 1 — Brand */}
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1D1D1F",
                  letterSpacing: "normal",
                  marginBottom: "10px",
                }}
              >
                Afan Mac Store
              </span>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6E6E73",
                  letterSpacing: "normal",
                  lineHeight: 1.5,
                  maxWidth: "220px",
                  margin: "0 0 20px",
                }}
              >
                Trusted Apple products, clear guidance, and WhatsApp support in
                Pakistan.
              </p>
              <a
                href={whatsappLink(BRAND_WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Afan Mac Store on WhatsApp"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  minHeight: "44px",
                  borderRadius: "9999px",
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "normal",
                  padding: "0 16px",
                  transition: "background-color 0.15s ease",
                }}
                className="hover:bg-[#1DAE56] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <MessageCircle
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
                Chat on WhatsApp
              </a>
            </div>

            {/* Column 2 — Quick Links */}
            <nav aria-label="Quick links">
              <span style={colHeadingStyle}>Quick Links</span>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={navLinkStyle}
                      className="hover:text-[#0071E3] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3 — Products */}
            <nav aria-label="Product categories">
              <span style={colHeadingStyle}>Products</span>
              {/* 2-col sub-grid on mobile prevents excessive stacked height */}
              <ul
                style={{ listStyle: "none", margin: 0, padding: 0 }}
                className="grid grid-cols-2 sm:grid-cols-1 gap-y-[6px] gap-x-4"
              >
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={navLinkStyle}
                      className="hover:text-[#0071E3] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 4 — Visit / Contact */}
            <div>
              <span style={colHeadingStyle}>Visit</span>

              {/* Head Office */}
              <span style={subLabelStyle}>Head Office</span>
              <p style={addressStyle}>
                Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi
              </p>

              {/* Sub Office */}
              <span style={subLabelStyle}>Sub Office</span>
              <p style={addressStyle}>
                M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore
              </p>

              {/* Business Hours */}
              <span style={{ ...subLabelStyle, marginBottom: "8px" }}>Hours</span>
              <dl
                style={{
                  margin: "0 0 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                {BUSINESS_HOURS.map((row) => (
                  <div
                    key={row.days}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "76px max-content",
                      gap: "6px",
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
                        color: row.closed ? "#AEAEB2" : "#6E6E73",
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

              {/* External action links */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Head Office in Google Maps"
                  style={{
                    fontSize: "13px",
                    color: "#0071E3",
                    textDecoration: "none",
                    letterSpacing: "normal",
                  }}
                  className="hover:underline focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                >
                  Open in Google Maps
                </a>
                <a
                  href={whatsappLink(VISIT_WA_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Afan Mac Store on WhatsApp"
                  style={{
                    fontSize: "13px",
                    color: "#25D366",
                    textDecoration: "none",
                    letterSpacing: "normal",
                  }}
                  className="hover:underline focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                >
                  WhatsApp us
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid #E8E8ED",
            padding: "16px 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#AEAEB2",
              letterSpacing: "normal",
            }}
          >
            © {currentYear} Afan Mac Store. All rights reserved.
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#AEAEB2",
              letterSpacing: "normal",
            }}
          >
            Afan Mac Store is an independent Apple reseller.
          </span>
        </div>

      </div>
    </footer>
  );
}
