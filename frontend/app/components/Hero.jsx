"use client";
import { useRouter } from "next/navigation";
import FeatureCard from "./FeatureCard";
import Button from "./Button";
import React, { useEffect, useRef } from "react"; // ← Add useRef

const Hero = () => {
  const router = useRouter();
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const speed = 2.5; // Adjust between 1.5 and 3 for noticeable speed
    const maxScroll = container.scrollWidth - container.clientWidth;

    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollAmount += speed;
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0; // Reset to loop
        }
        scrollRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="font-serif">
      {/* Hero Section */}
      <section className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[90vh] lg:h-screen">
        <img
          src="/images/bg1.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex justify-center items-center px-4">
          <div className="bg-black/75 px-4 py-8 md:px-8 md:py-12 rounded-2xl text-white text-center max-w-md md:max-w-2xl shadow-xl">
            <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-3 leading-snug">
              Experience Comfort in Every Stay
            </h1>
            <p className="mb-5 text-xs sm:text-sm md:text-base leading-relaxed">
              Discover cozy and affordable homestays across the country. Whether
              you're a traveler looking for a peaceful escape or a host with a
              space to share — StayNest makes it easy to connect, book, and feel
              at home.
            </p>
            <Button
              onClick={() => router.push("/all-properties")}
              className="cursor-pointer"
            >
              Book Your Stay
            </Button>
          </div>
        </div>
      </section>

      <section className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[90vh] lg:h-screen">
        <img
          src="/images/bg2.jpg"
          alt="Rooms"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="relative z-20 flex justify-center items-center px-4 py-8 md:py-16 text-white text-center min-h-full">
          <div className="bg-transparent w-full max-w-screen-xl">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 sm:mb-10">
              Experience Premium Hospitality
            </h2>

            <div
              ref={scrollRef}
              className="flex flex-nowrap md:flex-wrap gap-4 sm:gap-6 md:gap-10 justify-start md:justify-center items-stretch overflow-x-auto md:overflow-visible px-1 md:px-0 scrollbar-hide"
            >
              <div className="shrink-0 md:shrink">
                <FeatureCard
                  icon="🔍"
                  title="Discover Stays That Fit You"
                  description="Use smart filters to search by location, price, amenities, and unique preferences like cultural experiences or eco-friendly options."
                />
              </div>
              <div className="shrink-0 md:shrink">
                <FeatureCard
                  icon="📅"
                  title="Book With Live Availability"
                  description="Get real-time updates on property availability. No delays, no surprises — just seamless, instant bookings."
                />
              </div>
              <div className="shrink-0 md:shrink">
                <FeatureCard
                  icon="🔐"
                  title="Trusted Stays, Secure Payments"
                  description="Pay safely with leading payment gateways and browse honest, verified reviews from real guests for peace of mind."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
