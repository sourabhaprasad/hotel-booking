"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signUpUser } from "@lib/api";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match", { position: "top-center" });
    }

    try {
      await signUpUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success("Registered successfully!", { position: "top-center" });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Registration failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white py-10">
      <Toaster />
      <div className="bg-[#cae5f1] p-10 w-full max-w-lg rounded shadow-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#f8f9fa]/60 focus:ring-2 focus:ring-[#1b4b66]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#f8f9fa]/60 focus:ring-2 focus:ring-[#1b4b66]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#f8f9fa]/60 focus:ring-2 focus:ring-[#1b4b66]"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-semibold mb-1"
            >
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#f8f9fa]/60 focus:ring-2 focus:ring-[#1b4b66]"
              placeholder="Re-enter password"
              required
            />
          </div>

          {/* User Role */}
          <div>
            <label htmlFor="role" className="block font-semibold mb-1">
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#f8f9fa]/60 focus:ring-2 focus:ring-[#1b4b66]"
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="manager">Property Manager</option>
              <option value="guest">Guest</option>
            </select>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#1b4b66] text-white px-6 py-2 rounded font-semibold hover:bg-[#163b52]/40"
            >
              Sign Up!
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm font-medium">
          Registered Already?{" "}
          <Link
            href="/auth/sign-in"
            className="text-black underline hover:text-[#1b4b66]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
