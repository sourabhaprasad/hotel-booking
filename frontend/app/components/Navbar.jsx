"use client";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-[#0A2239] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="text-xl font-semibold">StayNest 🏡</h1>
      </Link>
      <div className="space-x-4 flex items-center">
        <Link
          href="/"
          className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-110"
        >
          Home
        </Link>
        {user?.role === "manager" ? (
          <Link
            href="/upload-property"
            className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-110"
          >
            Upload Property
          </Link>
        ) : (
          <Link
            href="/all-properties"
            className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-110"
          >
            View Properties
          </Link>
        )}

        {!user ? (
          <>
            <Link
              href="/auth/sign-up"
              className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-110"
            >
              Register
            </Link>
            <Link
              href="/auth/sign-in"
              className="px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-110"
            >
              Sign In
            </Link>
          </>
        ) : (
          <>
            <Link
              href={
                user.role === "manager" ? "/dashboard/host" : "/dashboard/user"
              }
              className="font-semibold text-sm px-3 py-2"
            >
              {user.name?.toUpperCase()}
            </Link>
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
