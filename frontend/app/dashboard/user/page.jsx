"use client";
import { useState } from "react";

export default function UserDashboard() {
  const [showUpcomingTrip, setShowUpcomingTrip] = useState(true);
  const [showBookingHistory, setShowBookingHistory] = useState(true);

  return (
    <div className="min-h-screen bg-[#D9EDF5] p-10 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center">
        Hi, [Guest Name]! 👋
      </h1>
      <p className="text-center font-semibold text-lg">
        Here’s your trip summary and upcoming stays.
      </p>

      {/* Upcoming Trip */}
      <div>
        <button
          onClick={() => setShowUpcomingTrip((prev) => !prev)}
          className="text-lg font-bold hover:underline"
        >
          › Upcoming Trip
        </button>

        {showUpcomingTrip && (
          <div className="mt-4 bg-gray-200 p-4 rounded-md w-fit mx-auto space-y-2 text-sm font-medium">
            <p><strong>Property Name:</strong> Villa Serenity</p>
            <p><strong>City, State:</strong> Mysuru, Karnataka</p>
            <p><strong>Check-in - Check-out:</strong> 2025-04-20 - 2025-04-23</p>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Contact Host
            </button>
          </div>
        )}
      </div>

      {/* Booking History */}
      <div>
        <button
          onClick={() => setShowBookingHistory((prev) => !prev)}
          className="text-lg font-bold hover:underline"
        >
          › Booking History
        </button>

        {showBookingHistory && (
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm text-left border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Sl No.</th>
                  <th className="p-2 border">Property Name</th>
                  <th className="p-2 border">Dates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">Villa Harmony</td>
                  <td className="p-2 border">2025-03-01 to 2025-03-03</td>
                </tr>
                <tr>
                  <td className="p-2 border">2</td>
                  <td className="p-2 border">Villa Bliss</td>
                  <td className="p-2 border">2025-02-15 to 2025-02-18</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
