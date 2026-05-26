/** Desplaza a un ancla teniendo en cuenta el header fijo */
export function scrollToHash(hash: string, offset = 72) {
  const id = hash.replace(/^.*#/, "");
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
