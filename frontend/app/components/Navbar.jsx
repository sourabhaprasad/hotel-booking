"use client";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="top-0 left-0 w-full z-50 bg-[#0A2239] text-white px-6 py-3 md:py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold">StayNest 🏡</h1>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <NavLinks user={user} handleLogout={handleLogout} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col items-start">
          <NavLinks
            user={user}
            handleLogout={handleLogout}
            isMobile
            closeMenu={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ user, handleLogout, isMobile = false, closeMenu }) {
  const linkClass = `px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-105 ${
    isMobile ? "w-full" : ""
  }`;

  return (
    <>
      <Link
        href="/"
        className={linkClass}
        onClick={isMobile ? closeMenu : undefined}
      >
        Home
      </Link>

      {user?.role === "manager" ? (
        <Link
          href="/upload-property"
          className={linkClass}
          onClick={isMobile ? closeMenu : undefined}
        >
          Upload Property
        </Link>
      ) : (
        <Link
          href="/all-properties"
          className={linkClass}
          onClick={isMobile ? closeMenu : undefined}
        >
          View Properties
        </Link>
      )}

      {!user ? (
        <>
          <Link
            href="/auth/sign-up"
            className={linkClass}
            onClick={isMobile ? closeMenu : undefined}
          >
            Register
          </Link>
          <Link
            href="/auth/sign-in"
            className={linkClass}
            onClick={isMobile ? closeMenu : undefined}
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
            className={`font-semibold text-sm ${linkClass}`}
            onClick={isMobile ? closeMenu : undefined}
          >
            {user.name?.toUpperCase()}
          </Link>
          <button
            onClick={() => {
              handleLogout();
              if (isMobile && closeMenu) closeMenu();
            }}
            className="px-3 py-2 rounded-md text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
}

NavLinks.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  closeMenu: PropTypes.func,
};
