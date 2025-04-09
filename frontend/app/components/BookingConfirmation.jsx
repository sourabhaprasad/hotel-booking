"use client";
import React, { useRef } from "react";

const BookingConfirmation = ({ booking }) => {
  const pdfRef = useRef(null);

  const handleDownload = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = pdfRef.current;
    html2pdf().from(element).save("booking-confirmation.pdf");
  };

  return (
    <div className="bg-[#D5EDF2] p-6 rounded-md max-w-3xl mx-auto" ref={pdfRef}>
      <h2 className="text-2xl font-bold text-center mb-4">
        Booking Confirmed!
      </h2>

      {/* Centered Image */}
      <div className="flex justify-center mb-4">
        <img src="/images/verified.png" alt="Success" className="w-24 h-24" />
      </div>

      {/* Booking Info */}
      <div className="space-y-1 text-lg">
        <p>
          <strong>Title:</strong> {booking.title}
        </p>
        <p>
          <strong>Type:</strong> {booking.type}
        </p>
        <p>
          <strong>Address:</strong> {booking.address}
        </p>
        <p>
          <strong>City:</strong> {booking.city}
        </p>
        <p>
          <strong>State:</strong> {booking.state}
        </p>
        <p>
          <strong>Pin Code:</strong> {booking.pinCode}
        </p>
        <p>
          <strong>Check In:</strong>{" "}
          {new Date(booking.checkIn).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p>
          <strong>Check Out:</strong>{" "}
          {new Date(booking.checkOut).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p>
          <strong>Total price:</strong> ₹{booking.totalPrice}
        </p>
      </div>

      <div className="text-center mt-4">
        <button
          className="bg-[#265073] text-white px-6 py-2 rounded hover:bg-[#1e3a5f]"
          onClick={handleDownload}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
