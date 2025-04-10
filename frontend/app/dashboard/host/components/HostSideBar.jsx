"use client";

import Link from "next/link";

const HostSidebar = () => {
  return (
    <div className="bg-white rounded p-4 space-y-4 shadow">
      <h2 className="text-lg font-bold text-[#265073]">Host Menu</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard/host/properties" className="hover:underline">
          My Properties
        </Link>
        <Link href="/dashboard/host/bookings" className="hover:underline">
          Bookings Received
        </Link>
      </nav>
    </div>
  );
};

export default HostSidebar;
