import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import { Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;