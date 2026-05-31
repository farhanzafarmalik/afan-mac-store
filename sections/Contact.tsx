// ---------------------------------------------------------------------------
// sections/Contact.tsx — Phase 9B
// ---------------------------------------------------------------------------
// Server Component — no client state needed.
// Compact CTA band: WhatsApp primary CTA + secondary info row.
// No contact form, no email, no phone call button.
// ---------------------------------------------------------------------------

import { MapPin, Clock, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

const CONTACT_WA_MSG =
  "Hi Afan Mac Store, I need help choosing an Apple product. Can you guide me?";

// ---------------------------------------------------------------------------
// Contact section
// ---------------------------------------------------------------------------
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: "#F5F5F7" }}
    >
      <div
        className="px-4 md:px-8"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "clamp(20px, 2.5vw, 28px)",
          paddingBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        {/* Centred CTA band — max 680px */}
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Overline */}
          <p
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "#AEAEB2",
              margin: "0 0 12px",
            }}
          >
            Contact
          </p>

          {/* Heading */}
          <h2
            id="contact-heading"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 3rem)",
              fontWeight: 600,
              color: "#1D1D1F",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 12px",
            }}
          >
            Need help choosing the right Apple product?
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(1rem, 1.25vw + 0.125rem, 1.25rem)",
              color: "#6E6E73",
              letterSpacing: "normal",
              lineHeight: 1.5,
              margin: "0 0 32px",
            }}
          >
            Message us on WhatsApp for current availability, condition details,
            and guidance.
          </p>

          {/* Primary CTA */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href={whatsappLink(CONTACT_WA_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Afan Mac Store on WhatsApp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                minHeight: "52px",
                borderRadius: "9999px",
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                fontSize: "17px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "normal",
                padding: "0 32px",
                transition: "background-color 0.15s ease",
              }}
              className="hover:bg-[#1DAE56] focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
            >
              <MessageCircle
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
              Chat on WhatsApp
            </a>
          </div>

          {/* Divider + secondary info row */}
          <div
            style={{
              marginTop: "clamp(32px, 4vw, 40px)",
              paddingTop: "clamp(24px, 3vw, 32px)",
              borderTop: "1px solid #E8E8ED",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "clamp(16px, 3vw, 32px)",
            }}
          >
            {/* Head Office address */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
                maxWidth: "220px",
                textAlign: "left",
              }}
            >
              <MapPin
                size={14}
                aria-hidden="true"
                focusable="false"
                color="#AEAEB2"
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "#6E6E73",
                  letterSpacing: "normal",
                  lineHeight: 1.4,
                }}
              >
                Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi
              </span>
            </div>

            {/* Sub Office address */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
                maxWidth: "220px",
                textAlign: "left",
              }}
            >
              <MapPin
                size={14}
                aria-hidden="true"
                focusable="false"
                color="#AEAEB2"
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "#6E6E73",
                  letterSpacing: "normal",
                  lineHeight: 1.4,
                }}
              >
                M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore
              </span>
            </div>

            {/* Business hours */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
                maxWidth: "260px",
                textAlign: "left",
              }}
            >
              <Clock
                size={14}
                aria-hidden="true"
                focusable="false"
                color="#AEAEB2"
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "#6E6E73",
                  letterSpacing: "normal",
                  lineHeight: 1.4,
                }}
              >
                Mon–Thu 12–10 PM · Fri 2:30–10 PM · Sat 12–10 PM · Sun Closed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
