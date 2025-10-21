// Convert a string to a consistent form

export default function normalize(str = "") {
  return String(str).trim().toLowerCase();
}
