import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }
  }, [userInfo, navigate]);

  return userInfo && <Outlet />;
};

export default PrivateRoute;
