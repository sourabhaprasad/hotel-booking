import HostSidebar from "./components/HostSideBar";
import PropTypes from "prop-types";
export default function HostDashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full flex bg-[#53A2BE]/30">
        <div className="w-1/4 p-4">
          <HostSidebar />
        </div>
        <div className="w-3/4 p-6">{children}</div>
      </div>
    </div>
  );
}

HostDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
