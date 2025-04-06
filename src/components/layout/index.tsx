import { Outlet } from "@tanstack/react-router";
import Sidebar from "./partials/sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-primary-7">
      <Sidebar />

      <main className="relative custom-cursor mt-2.5 xl:mt-5 xl:p-5 p-4 bg-primary-3 overflow-hidden xl:h-[calc(100vh-20px)] text-primary-5 flex-1 rounded-tl-3xl rounded-tr-3xl xl:rounded-tr-none xl:rounded-tl-3xl">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
