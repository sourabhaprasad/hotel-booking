"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInUser } from "@lib/api";
import { useUser } from "../../../context/UserContext";

const SignInPage = () => {
  const router = useRouter();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, token } = await signInUser(formData);

      localStorage.setItem("homestayToken", token);
      localStorage.setItem("token", token);

      login(user);

      toast.success("✅ Logged in successfully!", { position: "top-center" });

      setTimeout(() => {
        toast("➡️ Redirecting...", { position: "top-center" });

        setTimeout(() => {
          router.push(
            user.role === "manager" ? "/dashboard/host" : "/all-properties"
          );
        }, 1000);
      }, 1500);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white py-12 px-4 sm:px-6 items-center justify-center min-h-[80dvh]">
      <Toaster />
      <div className="bg-[#cae5f1] p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Sign In
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-sm sm:text-base mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]/60 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b4b66]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-sm sm:text-base mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]/60 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b4b66]"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 rounded font-semibold text-sm sm:text-base text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1b4b66] hover:bg-[#163b52]"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-xs sm:text-sm font-medium">
          Not registered?{" "}
          <Link
            href="/auth/sign-up"
            className="text-black underline hover:text-[#1b4b66]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
