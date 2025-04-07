import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-[#cae5f1] p-10 w-full max-w-md rounded shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

            <form className="space-y-5">
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
                        placeholder="Enter your password"
                    />
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-[#1b4b66] text-white px-6 py-2 rounded font-semibold hover:bg-[#163b52]"
                    >
                        Login
                    </button>
                </div>
            </form>

            {/* Not Registered */}
            <p className="text-center mt-4 text-sm font-medium">
                Not registered?{" "}
                <span className="text-black underline cursor-pointer">Sign Up</span>
            </p>
        </div>
    </div>
);
};

export default page;