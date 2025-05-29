import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-white w-[100%] flex">
      <div className="bg-blue-800 w-[60%]"></div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
