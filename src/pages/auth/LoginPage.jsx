import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { loginThunk } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
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

  const onSubmit = (data) => {
    dispatch(
      loginThunk({
        data,
        next: (message) => {
          toast.success(message);
          navigate("/dashboard");
        },
      }),
    );
  };

  return (
    <section className="container bg-primary/5 h-svh flex flex-col items-center justify-center">
      <div className="lg:w-4/12 lg:h-fit w-full px-6 py-12 flex flex-col items-center justify-center gap-8 bg-white lg:mt-16 mb-4 lg:p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-xl font-bold">Welcome Back</h2>
          <p className="text-dark-gray">
            Please enter your details to sign in.
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
          </div>

          <div className="grid">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
              <Link
                to="/auth/forgot"
                className="text-primary hover:underline text-sm"
              >
                Forgot password?
              </Link>
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
          </div>
          <p className="text-xs text-red-500 h-2">{errors.email?.message}</p>
          <button
            type="submit"
            className="py-2 w-full bg-primary rounded-lg text-white cursor-pointer hover:opacity-80 hover:shadow-sm flex items-center justify-center h-10"
          >
            <AiOutlineLoading3Quarters
              className={`${loading ? "block" : "hidden"} text-lg animate-spin`}
            />
            {loading ? "" : "Log In"}
          </button>
        </form>
      </div>
      <p>
        Dont have account?
        <Link to="/auth/register" className="ml-2 text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default LoginPage;
