"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("homestayUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("homestayUser");
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="bg-[#0A2239] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="text-xl font-semibold">Homestay Finder</h1>
      </Link>
      <div className="space-x-4 flex items-center">
        <Link
          href="/"
          className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 hover:scale-110"
        >
          Home
        </Link>
        {user?.role === "manager" ? (
          <Link
            href="/upload-property"
            className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 hover:scale-110"
          >
            Upload Property
          </Link>
        ) : (
          <Link
            href="/all-properties"
            className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 hover:scale-110"
          >
            View Properties
          </Link>
        )}

        {!user ? (
          <>
            <Link
              href="/auth/sign-up"
              className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 hover:scale-110"
            >
              Register
            </Link>
            <Link
              href="/auth/sign-in"
              className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 hover:scale-110"
            >
              Sign In
            </Link>
          </>
        ) : (
          <>
            {user?.role === "manager" ? (
              <Link
                href="/dashboard/host"
                className="font-semibold text-sm px-3 py-2"
              >
                {user.name.toUpperCase()}
              </Link>
            ) : (
              <Link
                href="/dashboard/user"
                className="font-semibold text-sm px-3 py-2"
              >
                {user.name.toUpperCase()}
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
