// ---------------------------------------------------------------------------
// data/locations.ts — Phase 9B
// ---------------------------------------------------------------------------
// Real business data only. Do NOT invent, alter, or add any address,
// phone number, email, hours, or map URL not listed here.
// ---------------------------------------------------------------------------

export interface BusinessHours {
  days: string;
  hours: string;
  /** true only for Sunday — renders hours in #AEAEB2 (muted) */
  closed?: boolean;
}

export interface Location {
  /** Unique slug — no spaces */
  id: string;
  /** Display label — "Head Office" or "Sub Office" */
  label: string;
  /** Full real-world address — do not modify */
  address: string;
  /** Google Maps URL — only provided for Head Office */
  mapsUrl?: string;
  /** Business hours — only provided for Head Office */
  hours?: BusinessHours[];
  /** true = Head Office (primary, full detail) */
  isPrimary: boolean;
  /** Pre-filled WhatsApp message for this location's CTA */
  whatsappMessage: string;
}

export const LOCATIONS: Location[] = [
  {
    id: "head-office",
    label: "Head Office",
    address: "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi",
    mapsUrl: "https://maps.app.goo.gl/iy6teEPKaKBSQJENA",
    hours: [
      { days: "Mon–Thu", hours: "12 PM – 10 PM" },
      { days: "Friday", hours: "2:30 PM – 10 PM" },
      { days: "Saturday", hours: "12 PM – 10 PM" },
      { days: "Sunday", hours: "Closed", closed: true },
    ],
    isPrimary: true,
    whatsappMessage:
      "Hi Afan Mac Store, I'm planning to visit your Rawalpindi store. Can you share current product availability?",
  },
  {
    id: "sub-office",
    label: "Sub Office",
    address: "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore",
    // mapsUrl: not provided — do not fabricate
    // hours: not provided — do not fabricate
    isPrimary: false,
    whatsappMessage:
      "Hi Afan Mac Store, I'm planning to visit your Lahore office. Can you guide me before I visit?",
  },
];
