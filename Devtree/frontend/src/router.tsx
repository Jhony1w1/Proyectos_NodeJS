import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} >
          <Route path="/auth/login" element={<LoginPage/>} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
