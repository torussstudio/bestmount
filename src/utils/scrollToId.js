export function scrollToId(id, offset = 100) {
    const el = document.getElementById(id);
    if (!el) return false;
  
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  }