"use client";
import { useRouter } from "next/navigation";
import React from "react";
import FeatureCard from "./FeatureCard";
import Button from "./Button";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="font-serif">
      <section className="relative min-h-screen">
        <img
          src="/images/hero1.jpg"
          alt="Hero"
          className="w-screen object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center px-4">
          <div className="bg-black/50 px-14 py-16 rounded-2xl text-white text-center max-w-2xl shadow-xl">
            <h1 className="text-xl md:text-3xl font-bold mb-4">
              Experience Comfort in Every Stay
            </h1>
            <p className="mb-6 text-sm md:text-base">
              Discover unparalleled & modern amenities ensuring a memorable
              stay.
            </p>
            <Button onClick={() => router.push("/all-properties")}>
              Book Your Stay
            </Button>{" "}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen">
        <img
          src="/images/hero2.jpeg"
          alt="Rooms"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center px-4 text-white text-center">
          <div className="bg-black/50 px-14 py-16 rounded-2xl max-w-6xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">
              Experience Premium Hospitality
            </h2>

            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
              <FeatureCard
                icon="🔍"
                title="Smart HomeStay Search"
                description="Find your perfect stay with powerful filters — location, price, culture, and even eco-options."
              />
              <FeatureCard
                icon="📅"
                title="Real-Time Availability"
                description="No more guessing — see live availability and book instantly with confidence."
              />
              <FeatureCard
                icon="🔐"
                title="Secure Payments & Verified Reviews"
                description="Pay safely through trusted gateways and read real reviews from verified guests."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
