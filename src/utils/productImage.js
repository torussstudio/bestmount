/** Public path — same logo as site header; works in admin and HashRouter builds */
export const PRODUCT_PLACEHOLDER_SRC = "/placeholder.png";

export function productImageSrc(imageUrl) {
  if (imageUrl && String(imageUrl).trim()) return imageUrl;
  return PRODUCT_PLACEHOLDER_SRC;
}
