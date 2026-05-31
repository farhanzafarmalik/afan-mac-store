// Single source of truth for WhatsApp contact details.
// Update WHATSAPP_NUMBER here to change every WhatsApp link across the site.
export const WHATSAPP_NUMBER = "923133388666";
export const WHATSAPP_DISPLAY = "+92 313 3388666";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
