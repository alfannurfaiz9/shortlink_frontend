import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { navLinks } from "../utils/index";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.authState);
  const token = useSelector((state) => state.authState?.auth?.token);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setLoading(true);
    dispatch(
      logoutThunk({
        next: (message) => {
          toast.success(message);
          navigate("/");
        },
      }),
    );
  };

  useEffect(() => {
    (() => {
      if (!auth.isPending) {
        setLoading(false);
      }
    })();
  }, [auth]);

  return (
    <header className="container bg-white shadow-sm text-sm sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <h1>
            <img src="/logo.svg" alt="logo" />
          </h1>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-dark-gray focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        <nav
          className={`absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none ${
            isOpen
              ? "opacity-100 visible py-6 px-4"
              : "opacity-0 invisible lg:opacity-100 lg:visible h-0 lg:h-auto overflow-hidden lg:overflow-visible"
          }`}
        >
          <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
            {navLinks.map((el, idx) => (
              <li
                key={idx}
                className={`${token ? "block" : "hidden"} w-full lg:w-auto`}
              >
                <NavLink
                  to={el.link}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-3 rounded-lg w-full ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white text-dark-gray hover:bg-blue-50"
                    }`
                  }
                >
                  {el.title}
                </NavLink>
              </li>
            ))}
            <li className="w-full lg:w-auto">
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${token ? "flex" : "hidden"} items-center gap-3 py-2 px-3 rounded-lg w-full ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-white text-dark-gray hover:bg-blue-50"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>

            <div
              className={`${token ? "hidden" : "flex"} flex-col w-full gap-2 mt-4 pt-4 border-t border-gray-100 lg:hidden`}
            >
              <Link
                to="/auth/login"
                className="text-dark-gray py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-50 text-center w-full"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="text-white bg-primary py-2 px-4 rounded-lg shadow-primary/40 shadow-md cursor-pointer hover:opacity-80 text-center w-full"
              >
                Register
              </Link>
            </div>
            <div
              className={`${token ? "flex" : "hidden"} flex-col w-full gap-2 mt-4 pt-4 border-t border-gray-100 lg:hidden`}
            >
              <button
                onClick={handleLogout}
                type="button"
                className="text-dark-gray py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-50 text-center w-full bg-dark-gray/20"
              >
                Logout
              </button>
            </div>
          </ul>
        </nav>

        <div
          className={`${token ? "hidden" : "lg:flex"}  items-center gap-4 hidden`}
        >
          <Link
            to="/auth/login"
            className="text-dark-gray py-2 px-4 rounded-lg cursor-pointer hover:opacity-80"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="text-white bg-primary py-2 px-4 rounded-lg shadow-primary/40 shadow-md cursor-pointer hover:opacity-80"
          >
            Register
          </Link>
        </div>
        <div className={`${token ? "lg:flex" : "hidden"}  items-center hidden`}>
          <img
            className="w-10"
            src="https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80"
            alt="avatar"
          />
          <button
            onClick={handleLogout}
            type="button"
            className="text-dark-gray py-2 px-4 rounded-lg cursor-pointer hover:opacity-80"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
