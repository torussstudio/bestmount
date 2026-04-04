const ADMIN_KEY = "admin_logged_in";

/**
 * Store admin session after successful login
 */
export function setAdminSession(adminData) {
  localStorage.setItem("admin", JSON.stringify(adminData));
  localStorage.setItem(ADMIN_KEY, "true");
}

/**
 * Logout admin
 */
export function logout() {
  localStorage.removeItem(ADMIN_KEY);
  localStorage.removeItem("admin");
  localStorage.removeItem("bm_admin_categories");
  localStorage.removeItem("bm_admin_products");
}

/**
 * Check if admin is logged in (both session markers must be present)
 */
export function isLoggedIn() {
  return (
    localStorage.getItem(ADMIN_KEY) === "true" &&
    !!localStorage.getItem("admin")
  );
}

/**
 * Get current admin data
 */
export function getAdmin() {
  const admin = localStorage.getItem("admin");
  return admin ? JSON.parse(admin) : null;
}