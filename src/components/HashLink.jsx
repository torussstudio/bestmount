import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../utils/scrollToId";

export default function HashLink({ to, offset = 100, children, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Link
      {...props}
      to={to}
      onClick={(e) => {
        e.preventDefault();

        const url = new URL(to, window.location.origin);
        const targetPath = url.pathname;
        const targetHash = url.hash; // "#materials"
        const id = targetHash.replace("#", "");

        // Always update the URL (so back button works)
        navigate(to);

        // If we are already on the same page, scroll immediately (even if hash didn’t change)
        if (location.pathname === targetPath && id) {
          scrollToId(id, offset);
          return;
        }

        // If navigating from another page, wait until route renders then scroll (retry a few times)
        if (id) {
          let tries = 0;
          const tick = () => {
            tries += 1;
            if (scrollToId(id, offset)) return;
            if (tries < 20) setTimeout(tick, 50);
          };
          setTimeout(tick, 0);
        }
      }}
    >
      {children}
    </Link>
  );
}