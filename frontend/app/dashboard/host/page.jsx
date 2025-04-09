"use client";
import { useState } from "react";

export default function HostDashboard() {
  const [showListings, setShowListings] = useState(true);
  const [showBookings, setShowBookings] = useState(true);

  return (
    <div className="min-h-screen bg-[#D9EDF5] p-10 space-y-6 font-serif">
      <h1 className="text-3xl font-bold text-center">
        Overview (Main Stats Card Area)
      </h1>

      {/* Total Listings */}
      <div>
        <button
          onClick={() => setShowListings(!showListings)}
          className="text-xl font-bold hover:underline"
        >
          › Total Listings
        </button>
        {showListings && (
          <ul className="list-decimal list-inside ml-6 mt-2 text-lg">
            <li>Villa 1</li>
            <li>Villa 2</li>
          </ul>
        )}
      </div>

      {/* Bookings */}
      <div>
        <button
          onClick={() => setShowBookings(!showBookings)}
          className="text-xl font-bold hover:underline"
        >
          › Bookings
        </button>
        {showBookings && (
          <div className="overflow-x-auto mt-3">
            <table className="w-full border border-gray-400 text-left text-md">
              <thead className="bg-gray-300">
                <tr>
                  <th className="border p-2">Sl No.</th>
                  <th className="border p-2">Property Name</th>
                  <th className="border p-2">Guest Name</th>
                  <th className="border p-2">Check In</th>
                  <th className="border p-2">Check Out</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border p-2">1</td>
                  <td className="border p-2">Villa 1</td>
                  <td className="border p-2">John</td>
                  <td className="border p-2">2025-04-10</td>
                  <td className="border p-2">2025-04-12</td>
                </tr>
                <tr className="bg-white">
                  <td className="border p-2">2</td>
                  <td className="border p-2">Villa 2</td>
                  <td className="border p-2">Mary</td>
                  <td className="border p-2">2025-04-14</td>
                  <td className="border p-2">2025-04-16</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
