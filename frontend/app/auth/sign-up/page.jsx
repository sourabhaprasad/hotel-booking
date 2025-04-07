import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white py-10">
      <div className="bg-[#cae5f1] p-10 w-full max-w-lg rounded shadow-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-semibold mb-1">
              Confirm password:
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]"
              placeholder="Re-enter password"
            />
          </div>

          {/* User Type (Dropdown) */}
          <div>
            <label className="block font-semibold mb-1">Type:</label>
            <select
              className="w-full px-4 py-2 border rounded bg-[#f8f9fa]"
              defaultValue=""
            >
              <option value="" disabled>
                Select type
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
              Book Your Stay
            </button>
          </div>
        </form>

        {/* Already Registered */}
        <p className="text-center mt-4 text-sm font-medium">
          Registered Already?{" "}
          <span className="text-black underline cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default page;
