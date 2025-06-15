"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInUser } from "@lib/api";

const SignInPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, token } = await signInUser(formData);

      localStorage.setItem("homestayUser", JSON.stringify(user));
      localStorage.setItem("homestayToken", token);
      localStorage.setItem("token", token);

      toast.success("Logged in successfully!", { position: "top-center" });
      setTimeout(() => {
        toast("Redirecting...", {
          icon: "➡️",
          position: "top-center",
        });

        setTimeout(() => {
          if (user.role === "manager") {
            router.push("/dashboard/host");
          } else {
            router.push("/all-properties");
          }
        }, 1000);
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Toaster />
      <div className="bg-[#cae5f1] p-10 w-full max-w-md rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]/60 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1b4b66]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password:</label>
            <input
              type="password"
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
              className="bg-[#1b4b66] text-white px-6 py-2 rounded font-semibold hover:bg-[#163b52]"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm font-medium">
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
