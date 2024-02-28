import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Footer from "./components/Footer";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/SignUp";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/home/*" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
