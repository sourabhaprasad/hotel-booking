import React from "react";
import PropTypes from "prop-types";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white/10 px-6 py-6 rounded-lg w-full sm:w-80 max-w-sm shadow-lg min-h-[260px] hover:bg-white/20 transition duration-300 ease-in-out">
      <div className="flex flex-col items-center text-center h-full">
        <div className="text-4xl mb-4" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
