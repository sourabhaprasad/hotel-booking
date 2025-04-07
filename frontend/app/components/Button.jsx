// components/Button.jsx
"use client";

import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-[#154d6d] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
