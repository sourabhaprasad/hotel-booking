import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { UserProvider } from "../context/UserContext";

export const metadata = {
  title: "StayNest",
  description: "Find Your Perfect Homestay",
  icons: {
    icon: "logo/homestay1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <UserProvider>
          <Navbar />
          <Toaster position="top-center" />
          <main className="flex-grow">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
