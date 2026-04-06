import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";

import ScrollToTop from "./components/ScrollToTop";
import PageWrapper from "./components/layout/PageWrapper";

import { checkAuthStatus } from "./utils/auth";

/* lazy load pages */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

const LoginPage = lazy(() => import("./pages/admin/LoginPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const ProductDataSheet = lazy(() => import("./pages/ProductDataSheet"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ProtectedRoute({ children }) {
  const [authStatus, setAuthStatus] = useState({ loading: true, isLoggedIn: false });

  useEffect(() => {
    checkAuthStatus().then(st => setAuthStatus({ loading: false, isLoggedIn: st.isLoggedIn }));
  }, []);

  if (authStatus.loading) return null;

  return authStatus.isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}

function GuestRoute({ children }) {
  const [authStatus, setAuthStatus] = useState({ loading: true, isLoggedIn: false });

  useEffect(() => {
    checkAuthStatus().then(st => setAuthStatus({ loading: false, isLoggedIn: st.isLoggedIn }));
  }, []);

  if (authStatus.loading) return null;

  return authStatus.isLoggedIn ? <Navigate to="/admin" replace /> : children;
}

// Dark fallback — matches the site background, eliminates grey/white flash
const PageFallback = <div style={{ background: "#0a0a0a", minHeight: "100vh" }} />;

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <Suspense fallback={PageFallback}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>

            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PageWrapper key="home">
                  <Home />
                </PageWrapper>
              }
            />

            <Route
              path="/about"
              element={
                <PageWrapper key="about">
                  <About />
                </PageWrapper>
              }
            />

            <Route
              path="/contact"
              element={
                <PageWrapper key="contact">
                  <Contact />
                </PageWrapper>
              }
            />

            {/* Admin Login — logged-in users go to dashboard */}
            <Route
              path="/admin/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Product data sheet */}
            <Route
              path="/product/:id"
              element={
                <PageWrapper key="datasheet">
                  <ProductDataSheet />
                </PageWrapper>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}