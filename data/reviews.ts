// ---------------------------------------------------------------------------
// data/reviews.ts — Phase 8B
// ---------------------------------------------------------------------------
// Source: Afan Mac Store Google Business profile (4.9 rating, 32 reviews)
// All text is real customer review content — do NOT invent, rewrite, or add
// any name, text, or field not listed here.
// ---------------------------------------------------------------------------

export interface Review {
  /** Unique slug — no spaces */
  id: string;
  /** Reviewer's review text — real excerpt, do not modify */
  text: string;
  /** First name + last initial only — e.g. "Talha Z." */
  name: string;
  /** Context label — e.g. "MacBook Buyer", "Customer Review" */
  label: string;
  /** Always 5 — all displayed reviews are 5-star Google reviews */
  rating: 5;
}

export const REVIEWS: Review[] = [
  {
    id: "talha-z",
    text: "Good experience, would definitely buy from again.",
    name: "Talha Z.",
    label: "Customer Review",
    rating: 5,
  },
  {
    id: "chaudhary-i",
    // Shortened Google review excerpt — original review is longer
    text: "The staff was polite, knowledgeable, and very cooperative. They guided me honestly according to my budget and needs.",
    name: "Chaudhary I.",
    label: "iPhone Buyer",
    rating: 5,
  },
  {
    id: "aqib-k",
    // Shortened Google review excerpt — original review is longer
    text: "The store is in a good location and very easy to reach. The staff is friendly and cooperative.",
    name: "Aqib K.",
    label: "Customer Review",
    rating: 5,
  },
  {
    id: "usama-z",
    // Shortened Google review excerpt — original review is longer
    text: "The staff is very professional, cooperative, and knowledgeable. Customer service and after-sales support are excellent.",
    name: "Usama Z.",
    label: "Apple Products Buyer",
    rating: 5,
  },
  {
    id: "samar-e",
    // Shortened Google review excerpt — original review is longer
    text: "Excellent service and product. The team was helpful, and the MacBook is in great condition.",
    name: "Samar E.",
    label: "MacBook Buyer",
    rating: 5,
  },
  {
    id: "zeeshan-a",
    // Shortened Google review excerpt — original review is longer
    text: "They explained all details about the laptop before I purchased. Such a nice and cooperative experience.",
    name: "Zeeshan A.",
    label: "MacBook Buyer",
    rating: 5,
  },
];
