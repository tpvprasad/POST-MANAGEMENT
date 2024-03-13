import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.jsx";

function LogoutBtn() {
  const dispatch = useDispatch();

  const lougoutHandler = () => {
    dispatch(logout());
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={lougoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
