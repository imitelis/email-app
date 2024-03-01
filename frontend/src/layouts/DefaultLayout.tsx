import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import { Navigate } from "react-router-dom";

import NavBar from "../components/NavBar";

const DefaultLayout = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (basicUserInfo) {
    return <Navigate replace to={"/home"} />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
