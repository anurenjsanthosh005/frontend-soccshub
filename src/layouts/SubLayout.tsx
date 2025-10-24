import React from "react";
import { Link, Outlet } from "react-router-dom";

function SubLayout() {
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden container mx-auto w-[30vw] ">
      <section className="mt-12 h-[25px] px-1 py-1 flex justify-between">
        <div className="flex">
          <Link to="/">
            <div className="max-h-16 max-w-[300px] w-[80px] font-bold text-[15px]">
              SoccsHub
            </div>
          </Link>
        </div>
        <div>
          {/* <i className="fa-solid fa-xmark"></i> */}
        </div>
      </section>
      <main className="flex flex-col flex-grow mb-[5vh]">
        <Outlet />
      </main>
    </div>
  );
}

export default SubLayout;
