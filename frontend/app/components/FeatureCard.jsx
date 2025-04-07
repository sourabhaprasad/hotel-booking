import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-black/40 px-6 py-6 rounded-lg w-64 shadow-lg">
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

export default FeatureCard;
