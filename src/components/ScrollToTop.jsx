import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- omit hash: only reset on pathname change
  }, [pathname]);

  return null;
}