import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import EmailView from "./views/EmailView";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Invite from "./views/Invite";
import Password from "./views/Password";
import LandingPage from "./views/LandingPage";
import NotFound from "./views/NotFound";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/password" element={<Password />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/emails/*" element={<EmailView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
