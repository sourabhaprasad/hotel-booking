"use client";

import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-teal-700 text-white text-sm sm:text-base px-4 py-1.5 sm:px-6 sm:py-2 rounded-md hover:bg-[#154d6d] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

export default Button;
