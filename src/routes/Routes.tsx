import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Shop from "@/pages/Shop";
import ProductDetails from "@/pages/ProductDetails";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import TopSelling from "@/pages/TopSelling";
import Cart from "@/pages/Cart";
import Payment from "@/pages/Payment";
import Contact from "@/pages/Contact";
import AboutUs from "@/pages/AboutUs";
import Career from "@/pages/Career";
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import DeliveryPolicy from "@/pages/DeliveryPolicy";

import AdminLayout from "@/Layout/AdminLayout";

import AdminDashboardPage from "@/pages/Admin/AdminDashboardPage";
import SettingsPage from "@/pages/Admin/SettingsPage";
import ClientDashboardPage from "@/pages/Client/ClientDashboardPage";
import ClientLayout from "@/Layout/ClientLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/products",
        element: <Shop />,
      },
      {
        path: "/product/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/products/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/category/:categorySlug",
        element: <Shop />,
      },
      {
        path: "/offers",
        element: <Shop />,
      },
      {
        path: "/top-selling",
        element: <TopSelling />,
      },
      {
        path: "/top-sellings",
        element: <TopSelling />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/checkout",
        element: <Payment />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/career",
        element: <Career />,
      },
      {
        path: "/careers",
        element: <Career />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/terms-and-conditions",
        element: <Terms />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "/refund-and-return-policy",
        element: <RefundPolicy />,
      },
      {
        path: "/delivery-policy",
        element: <DeliveryPolicy />,
      },
    ],
  },

  /* Client Dashboard */
  {
    path: "/client-dashboard",
    element: <ClientLayout />,
    children: [
      { index: true, element: <ClientDashboardPage /> },
      { path: "dashboard", element: <ClientDashboardPage /> },
    ],
  },

  /* Admin Dashboard */
  {
    path: "/admin-dashboard",
    element: (
      // <AdminRoute>
      <AdminLayout />
      // </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "dashboard", element: <AdminDashboardPage /> },

      { path: "settings", element: <SettingsPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
