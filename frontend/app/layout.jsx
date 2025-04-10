import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Homestay Finder",
  description: "Comfort",
  icons: {
    icon: "logo/homestay1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster position="top-center" />
        <main className="flex-grow flex items-center justify-center ">
          <div className="w-full max-w-7xl">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
