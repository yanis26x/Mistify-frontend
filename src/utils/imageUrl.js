export function getImageUrl(imageUrl, backendUrl = "http://localhost:3000") {
  if (!imageUrl) return "/bloodd.png";

  const trimmedUrl = String(imageUrl).trim();
  if (!trimmedUrl) return "/bloodd.png";

  if (/^(https?:|data:|blob:)/i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `${backendUrl}${trimmedUrl.startsWith("/") ? "" : "/"}${trimmedUrl}`;
}
