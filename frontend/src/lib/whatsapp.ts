export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923258828885";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function customBagMessage(imageUrl: string): string {
  return `Hi Aura Manufacturers! I'd like to order a custom bag.\n\nReference image: ${imageUrl}\n\nPlease share design options, pricing, and timeline.`;
}

export function productInquiryMessage(productName: string, productUrl: string): string {
  return `Hi Aura Manufacturers! I'm interested in "${productName}".\n${productUrl}\n\nPlease share availability and pricing.`;
}
