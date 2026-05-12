export function getImageUrl(imageUrl, backendUrl = "http://localhost:3000") {
  if (!imageUrl) return "/flacon-parfum.png";

  const trimmedUrl = String(imageUrl).trim();
  if (!trimmedUrl) return "/flacon-parfum.png";

  if (/^(https?:|data:|blob:)/i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `${backendUrl}${trimmedUrl.startsWith("/") ? "" : "/"}${trimmedUrl}`;
}
