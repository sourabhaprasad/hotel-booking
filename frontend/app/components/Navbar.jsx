"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#0A2239] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">Homestay Finder</h1>
      <div className="space-x-4">
        {[
          { label: "Home", href: "/" },
          { label: "List your prop", href: "/list-property" },
          { label: "Register", href: "/auth/sign-up" },
          { label: "Sign In", href: "/auth/sign-in" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 hover:text-white hover:scale-110 md:hover:text-xl hover-text-shadow"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
