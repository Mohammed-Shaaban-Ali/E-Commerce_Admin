import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Forms/Login";
import ResetPassword from "./pages/Forms/ResetPassword";
import ForgetPassword from "./pages/Forms/ForgetPassword";
import MainLayout from "./pages/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Customes from "./pages/Customes/Customes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/rorget-password" element={<ForgetPassword />} />

        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customes" element={<Customes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
