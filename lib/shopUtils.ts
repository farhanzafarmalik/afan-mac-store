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

/** Delivery details collected for accessories COD orders (component state only — never persisted). */
export interface DeliveryDetails {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

/** Returns true when all required delivery fields are filled. */
export function isDeliveryComplete(d: DeliveryDetails): boolean {
  return (
    d.name.trim().length > 0 &&
    d.phone.trim().length > 0 &&
    d.city.trim().length > 0 &&
    d.address.trim().length > 0
  );
}

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

/** Message for the Inquiry Bag CTA. Accepts optional delivery details for accessories. */
export function buildInquiryMessage(
  cartItems: CartItem[],
  delivery?: DeliveryDetails
): string {
  if (cartItems.length === 0) return "";

  const devices = cartItems.filter((i) => i.productType === "device");
  const accessories = cartItems.filter((i) => i.productType === "accessory");
  const lines: string[] = [];

  const deliveryBlock =
    delivery && isDeliveryComplete(delivery)
      ? [
          "\nDelivery Details:",
          `Name: ${delivery.name.trim()}`,
          `Phone: ${delivery.phone.trim()}`,
          `City: ${delivery.city.trim()}`,
          `Address: ${delivery.address.trim()}`,
          ...(delivery.notes.trim() ? [`Notes: ${delivery.notes.trim()}`] : []),
        ]
      : [];

  if (devices.length > 0 && accessories.length > 0) {
    lines.push("Hi Afan Mac Store, I have two requests:");
    lines.push("\nDevice Inquiry:");
    devices.forEach((item, i) => lines.push(`${i + 1}. ${item.name} (×1)`));
    lines.push(
      "Please confirm availability, condition, price, and warranty/checking period."
    );
    lines.push("\nCOD Accessory Order:");
    accessories.forEach((item, i) =>
      lines.push(`${i + 1}. ${item.name} (×${item.quantity})`)
    );
    lines.push(...deliveryBlock);
    lines.push(
      "\nPlease confirm final price, delivery charges, and availability on WhatsApp. Thank you."
    );
  } else if (devices.length > 0) {
    lines.push("Hi Afan Mac Store, I’d like to inquire about:");
    lines.push("\nDevices:");
    devices.forEach((item, i) => lines.push(`${i + 1}. ${item.name} (×1)`));
    lines.push(
      "\nPlease confirm availability, condition, price, and warranty/checking period for each. Thank you."
    );
  } else {
    lines.push("Hi Afan Mac Store, I’d like to place a COD order:");
    lines.push("\nAccessories:");
    accessories.forEach((item, i) =>
      lines.push(`${i + 1}. ${item.name} (×${item.quantity})`)
    );
    lines.push(...deliveryBlock);
    lines.push(
      "\nPlease confirm final price, delivery charges, and availability on WhatsApp. Thank you."
    );
  }

  return lines.join("\n");
}
