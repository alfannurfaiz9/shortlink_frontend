import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateLink from "./pages/CreateLink";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route index path="/" element={<Navigate to="/home" replace />} />
        <Route index path="/" element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="create" element={<CreateLink />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
