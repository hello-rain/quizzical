// Decode HTML entities returned by the API into plain text
export default function decodeHtml(html) {
  if (typeof document === "undefined") return html;
  const text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
}
