import { Route, Routes } from 'react-router-dom';
import Home from "./views/Home";
import Login from './views/Login';
import Register from './views/Register';
import DefaultLayout from './layouts/DefaultLayout';
import ProtectedLayout from './layouts/ProtectedLayout';



function App() {

  return (
    <>
     <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
