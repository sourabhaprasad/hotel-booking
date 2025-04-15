"use client";

import BookingsReceived from "../components/BookingsReceived";

export default function HostDashboardPage() {
  return (
    <div className="min-h-screen bg-[#d1ecf3] p-6 flex flex-col items-center justify-start">
      <div className="w-full  max-w-4xl space-y-6">
        <BookingsReceived />
      </div>
    </div>
  );
}
