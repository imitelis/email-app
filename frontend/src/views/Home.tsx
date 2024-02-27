import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Inbox from "../components/Inbox";
import Email from "../components/Email";
// import SideBar from "../components/SideBar";
import { useDispatch } from "react-redux";
import { clearBasicUserInfo } from "../slices/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(clearBasicUserInfo());
      navigate("/");
      localStorage.removeItem("userInfo");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* <SideBar /> */}
      <Inbox />
      <Email
        sender={"david@gmail.com"}
        subject={"git"}
        body={"asdasdasdasdsd"}
      />
      <h1>Home</h1>
      <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
        Logout
      </Button>
      <Footer />
    </>
  );
};

export default Home;
