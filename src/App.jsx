// import { AnimatePresence } from "framer-motion";
// import { Routes, Route, useLocation } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
// import PageWrapper from "./components/layout/PageWrapper";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import LoginPage from "./pages/admin/LoginPage";
// import DashboardPage from "./pages/admin/DashboardPage";
// import { Navigate } from "react-router-dom";

// export default function App() {
//   const location = useLocation();

//   return (
//     <>
//       <ScrollToTop />
//       <AnimatePresence mode="wait" initial={false}>
//         <Routes location={location} key={location.pathname}>
//           <Route 
//             path="/" 
//             element={
//               <PageWrapper key="home">
//                 <Home />
//               </PageWrapper>
//             } 
//           />
//           <Route 
//             path="/about" 
//             element={
//               <PageWrapper key="about">
//                 <About />
//               </PageWrapper>
//             } 
//           />
//           <Route 
//             path="/contact" 
//             element={
//               <PageWrapper key="contact">
//                 <Contact />
//               </PageWrapper>
//             } 
//           />
//           {/* Admin routes – rendered outside AnimatePresence to use their own layout */}
//           <Route path="/admin/login" element={<LoginPage />} />
//          <Route path="/admin/*" element={<DashboardPage />} />
//          <Route path="/admin" element={<Navigate to="/admin/login" />} />
//         </Routes>
//       </AnimatePresence>
//     </>
//   );
// }


import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PageWrapper from "./components/layout/PageWrapper";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import NotFound from "./pages/NotFound";
import ProductDataSheet from "./pages/ProductDataSheet";

import { isLoggedIn } from "./utils/auth";

export default function App() {
  const location = useLocation();
  console.log("isLoggedIn:", isLoggedIn());

  return (
    <>
      <ScrollToTop />

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

          {/* Admin Login */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* ✅ Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              isLoggedIn() ? (
                <DashboardPage />
              ) : (
                <Navigate to="/admin/login" replace />
              )
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

          {/* 404 – catch-all */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AnimatePresence>
    </>
  );
}
