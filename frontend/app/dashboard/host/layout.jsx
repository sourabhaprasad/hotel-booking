import HostSidebar from "./components/HostSideBar";
import PropTypes from "prop-types";

export default function HostDashboardLayout({ children }) {
  return (
    <div className="min-h-screen  bg-[#53A2BE]/30">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/4 p-4">
          <HostSidebar />
        </div>
        <div className="w-full md:w-3/4 p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

HostDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
