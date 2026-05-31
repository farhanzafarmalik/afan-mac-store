// ---------------------------------------------------------------------------
// lib/shopUtils.ts — Phase 12B
// ---------------------------------------------------------------------------
// Pure utility functions for the Saved + Inquiry Bag system.
// No React imports. No side effects.
// ---------------------------------------------------------------------------

export type ProductType = "device" | "accessory";
export type CartMode = "inquiry" | "cod";

export interface SavedItem {
  id: string;
  name: string;
  categorySlug: string;
  category: string;
  productType: ProductType;
  savedAt: number;
}

export interface CartItem {
  id: string;
  name: string;
  categorySlug: string;
  category: string;
  productType: ProductType;
  /** "inquiry" for devices, "cod" for accessories */
  cartMode: CartMode;
  /** Always 1 for devices. 1–9 for accessories. */
  quantity: number;
  addedAt: number;
}

/** Minimum data needed to save or add a product. */
export interface ProductInput {
  id: string;
  name: string;
  categorySlug: string;
  category: string;
}

// ---------------------------------------------------------------------------
// Type derivation
// ---------------------------------------------------------------------------

/** Returns "accessory" for the accessories category; "device" for everything else. */
export function getProductType(categorySlug: string): ProductType {
  return categorySlug === "accessories" ? "accessory" : "device";
}

/** Returns "cod" for accessories; "inquiry" for devices. */
export function getCartMode(categorySlug: string): CartMode {
  return categorySlug === "accessories" ? "cod" : "inquiry";
}

// ---------------------------------------------------------------------------
// WhatsApp message builders
// ---------------------------------------------------------------------------

/** Message for the Saved drawer "Send Saved List on WhatsApp" CTA. */
export function buildSavedMessage(savedItems: SavedItem[]): string {
  if (savedItems.length === 0) return "";
  const lines = savedItems
    .map((item, i) => `${i + 1}. ${item.name}`)
    .join("\n");
  return (
    `Hi Afan Mac Store, I have saved the following products and want to know more:\n\n` +
    `${lines}\n\n` +
    `Please share current availability and details.`
  );
}

/** Message for the Inquiry Bag "Send on WhatsApp" CTA. */
export function buildInquiryMessage(cartItems: CartItem[]): string {
  if (cartItems.length === 0) return "";

  const devices = cartItems.filter((i) => i.productType === "device");
  const accessories = cartItems.filter((i) => i.productType === "accessory");
  const lines: string[] = [];

  if (devices.length > 0 && accessories.length > 0) {
    lines.push("Hi Afan Mac Store, I want to inquire/order the following items:");
    lines.push("\nDevice inquiries:");
    devices.forEach((item, i) => lines.push(`${i + 1}. ${item.name}`));
    lines.push("\nAccessories (COD):");
    accessories.forEach((item, i) =>
      lines.push(`${i + 1}. ${item.name} x ${item.quantity}`)
    );
    lines.push(
      "\nPlease confirm current availability, condition, price, and COD delivery details for accessories."
    );
  } else if (devices.length > 0) {
    lines.push(
      "Hi Afan Mac Store, I want to inquire about the following Apple products:"
    );
    lines.push("\nDevice inquiries:");
    devices.forEach((item, i) => lines.push(`${i + 1}. ${item.name}`));
    lines.push("\nPlease confirm current availability, condition, and price.");
  } else {
    lines.push(
      "Hi Afan Mac Store, I want to order the following accessories via COD:"
    );
    lines.push("\nAccessories:");
    accessories.forEach((item, i) =>
      lines.push(`${i + 1}. ${item.name} x ${item.quantity}`)
    );
    lines.push("\nPlease confirm availability, price, and COD delivery details.");
  }

  return lines.join("\n");
}
