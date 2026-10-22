import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { registerThunk } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.authState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Password do not match",
      });

      return;
    }

    dispatch(
      registerThunk({
        data: {
          email: data.email,
          full_name: data.full_name,
          password: data.password,
        },
        next: (message) => {
          toast.success(message);
          navigate("/auth/login");
        },
      }),
    );
  };

  useEffect(() => {
    (() => {
      if (auth.isPending) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    })();

    if (auth.isRejected) {
      setError("email", {
        type: "manual",
        message: auth.error,
      });

      return;
    }
  }, [auth, setError]);

  return (
    <section className="container bg-primary/5 h-svh lg:h-fit p-4 flex flex-col items-center justify-center">
      <div className="lg:w-4/12 lg:h-fit w-full px-6 py-8 flex flex-col items-center justify-center gap-8 bg-white lg:mt-16 mb-4 lg:p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-xl font-bold">Create Account</h2>
          <p className="text-dark-gray">
            Join the elite architects of the web.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid gap-5 text-md"
        >
          <div className="grid">
            <label htmlFor="email">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="outline-none w-full border border-gray/80 p-2 rounded-lg"
            />
            <p className="text-xs text-red-500 h-2">{errors.email?.message}</p>
          </div>
          <div className="grid">
            <label htmlFor="full_name">Fullname</label>
            <input
              {...register("full_name", {
                required: "Full name is required",
              })}
              id="full_name"
              type="text"
              placeholder="Enter Your Fullname"
              className="outline-none w-full border border-gray/80 p-2 rounded-lg"
            />
            <p className="text-xs text-red-500 h-2">
              {errors.full_name?.message}
            </p>
          </div>
          <div className="grid">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
            </div>
            <div className="flex items-center justify-between border border-gray/80 p-2 rounded-lg">
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <LuEye size={20} className="cursor-pointer" />
                ) : (
                  <LuEyeOff size={20} className="cursor-pointer" />
                )}
              </button>
            </div>
            <p className="text-xs text-red-500 h-2">
              {errors.password?.message}
            </p>
          </div>
          <div className="grid">
            <div className="flex items-center justify-between">
              <label htmlFor="confirm_password">Confirm Password</label>
            </div>
            <div className="flex items-center justify-between border border-gray/80 p-2 rounded-lg">
              <input
                {...register("confirm_password", {
                  required: "Confirm password is required",
                })}
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <LuEye size={20} className="cursor-pointer" />
                ) : (
                  <LuEyeOff size={20} className="cursor-pointer" />
                )}
              </button>
            </div>
            <p className="text-xs text-red-500 h-2">
              {errors.confirm_password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="py-2 w-full bg-primary rounded-lg text-white cursor-pointer hover:opacity-80 hover:shadow-sm flex items-center justify-center h-10"
          >
            <AiOutlineLoading3Quarters
              className={`${loading ? "block" : "hidden"} text-lg animate-spin`}
            />
            {loading ? "" : "Register"}
          </button>
        </form>
      </div>
      <p className="lg:mb-32">
        Already have account?
        <Link to="/auth/login" className="ml-2 text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default RegisterPage;
