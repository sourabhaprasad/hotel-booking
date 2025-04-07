import React from "react";

const Hero = () => {
  return (
    <div className="font-serif">
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="/images/hero1.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center px-4">
          <div className="bg-black/50 px-14 py-16 rounded-2xl text-white text-center max-w-2xl shadow-xl">
            <h1 className="text-xl md:text-3xl font-bold mb-4">
              Experience Comfort in Every Stay
            </h1>
            <p className="mb-6 text-sm md:text-base">
              Discover unparalleled & modern amenities ensuring a memorable stay.
            </p>
            <button className="bg-teal-700 hover:bg-teal-800 px-6 py-2 rounded text-sm text-white">
              Book Your Stay
            </button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="relative h-screen">
        <img
          src="/images/hero2.jpeg"
          alt="Rooms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center text-white text-center px-4">
          <div className="bg-black/50 px-14 py-16 rounded-2xl text-white text-center max-w-6xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">
              Experience Premium Hospitality
            </h2>
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
              <div className="bg-black/40 px-6 py-6 rounded-lg w-64 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-4">🔍</div>
                  <h3 className="text-white text-base font-bold mb-2 text-center">Smart HomeStay Search</h3>
                </div>
                <p className="text-white text-sm text-center">
                  Find your perfect stay with powerful filters — location, price, culture, and even eco-options.
                </p>
              </div>
              <div className="bg-black/40 px-6 py-6 rounded-lg w-64 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-4">📅</div>
                  <h3 className="text-white text-base font-bold mb-2 text-center">Real-Time Availability</h3>
                </div>
                <p className="text-white text-sm text-center">
                  No more guessing — see live availability and book instantly with confidence.
                </p>
              </div>
              <div className="bg-black/40 px-6 py-6 rounded-lg w-64 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-4">🔐</div>
                  <h3 className="text-white text-base font-bold mb-2 text-center">Secure Payments & Verified Reviews</h3>
                </div>
                <p className="text-white text-sm text-center">
                  Pay safely through trusted gateways and read real reviews from verified guests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
