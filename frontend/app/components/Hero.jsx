"use client";
import { useRouter } from "next/navigation";
import React from "react";
import FeatureCard from "./FeatureCard";
import Button from "./Button";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="font-serif">
      {/* Hero Section */}
      <section className="relative h-[100vh]">
        <img
          src="/images/bg1.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center px-4">
          <div className="bg-black/75 px-10 py-14 rounded-2xl text-white text-center max-w-2xl shadow-xl">
            <h1 className="text-xl md:text-3xl font-bold mb-4">
              Experience Comfort in Every Stay
            </h1>
            <p className="mb-6 text-xs md:text-sm">
              Discover cozy and affordable homestays across the country. Whether
              you're a traveler looking for a peaceful escape or a host with a
              space to share — StayNest makes it easy to connect, book, and feel
              at home.
            </p>
            <Button onClick={() => router.push("/all-properties")}>
              Book Your Stay
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative h-[100vh]">
        <img
          src="/images/bg2.jpg"
          alt="Rooms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center px-4 text-white text-center">
          <div className="bg-black/70 px-10 py-14 rounded-2xl max-w-6xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">
              Experience Premium Hospitality
            </h2>

            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
              <FeatureCard
                icon="🔍"
                title="Discover Stays That Fit You"
                description="Use smart filters to search by location, price, amenities, and unique preferences like cultural experiences or eco-friendly options."
              />
              <FeatureCard
                icon="📅"
                title="Book With Live Availability"
                description="Get real-time updates on property availability. No delays, no surprises — just seamless, instant bookings."
              />
              <FeatureCard
                icon="🔐"
                title="Trusted Stays, Secure Payments"
                description="Pay safely with leading payment gateways and browse honest, verified reviews from real guests for peace of mind."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
