import API from "../api";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Reject immediately if the error is from login, logout, or refresh
    if (
  originalRequest.url?.includes("/admin/login") ||
  originalRequest.url?.includes("/admin/logout") ||
  originalRequest.url?.includes("/admin/refresh") ||
  originalRequest.url?.includes("/admin/me")
) {
      return Promise.reject(error);
    }

    // Only retry on 401 Unauthorized if not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          return API(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await API.post("/admin/refresh");
        processQueue(null);
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Check if admin is logged in by calling /me endpoint
 */
export async function checkAuthStatus() {
  try {
    const response = await API.get("/admin/me");
    return {
      isLoggedIn: true,
      admin: response.data.admin
    };
  } catch (error) {
  // Silent fail for expected unauthenticated state
  if (error.response?.status !== 401) {
    console.error("Auth check failed:", error);
  }

  return {
    isLoggedIn: false,
    admin: null
  };
}
}

/**
 * Logout admin - clear session on server and redirect
 */
export async function logout() {
  try {
    await API.post("/admin/logout");
  } catch (error) {
    console.error("Logout error:", error);
  }
  // Clear any local state if needed
  window.location.href = "/#/admin/login";
}

/**
 * Get current admin data (requires server call)
 */
export async function getAdmin() {
  const authStatus = await checkAuthStatus();
  return authStatus.admin;
}

/**
 * Check if admin is logged in (requires server call)
 * @deprecated Use checkAuthStatus() instead for better async handling
 */
export async function isLoggedIn() {
  const authStatus = await checkAuthStatus();
  return authStatus.isLoggedIn;
}