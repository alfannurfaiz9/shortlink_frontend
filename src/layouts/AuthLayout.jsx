import { Outlet } from "react-router";
import Footer from "../components/home/Footer";

const AuthLayout = () => {
  return (
    <main>
      <Outlet />
      <Footer />
    </main>
  );
};

export default AuthLayout;
