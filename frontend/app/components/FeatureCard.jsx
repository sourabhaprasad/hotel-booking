import React from "react";
import PropTypes from "prop-types";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white/10 px-6 py-6 rounded-lg w-64 shadow-lg min-h-[280px] hover:bg-white/20 transition duration-300 ease-in-out">
      <div className="flex flex-col items-center">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-white text-base font-bold mb-2 text-center">
          {title}
        </h3>
        <p className="text-white text-sm text-center">{description}</p>
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
