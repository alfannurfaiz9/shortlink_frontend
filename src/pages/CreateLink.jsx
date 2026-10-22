import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { createLink } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const CreateLink = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const auth = useSelector((state) => state.authState);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const body = {
      original_url: data.destination,
      slug: data.custom_slug,
    };

    dispatch(
      createLink({
        body,
        next: (message) => {
          toast.success(message);
          navigate("/dashboard");
        },
        setErr: (message) => {
          toast.error(message);
          navigate("/dashboard");
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
  }, [auth, setError]);
  return (
    <section className="lg:py-12 px-8 py-32 h-svh lg:h-fit bg-dark-gray/30">
      <div className="lg:w-5/12 mx-auto grid gap-2">
        <Link to="/dashboard" className="text-primary font-semibold">
          Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold">Create New Short Link</h2>
        <p className="text-dark-gray">
          Transform your long URLs into clean, manageable assets.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid gap-5 text-md my-12 lg:my-6 bg-white px-4 py-8 rounded-lg text-sm shadow-sm"
        >
          <div className="grid gap-1">
            <label htmlFor="destination">DESTINATION URL</label>
            <input
              {...register("destination", {
                required: "Destination is required",
              })}
              id="destination"
              type="destination"
              placeholder="Enter Your Destination"
              className="outline-none w-full border border-gray/80 p-2 rounded-lg"
            />
            <p className="text-xs text-dark-gray">
              Ensure your URL starts with http:// or https://
            </p>
            <p className="text-xs text-red-500">
              {errors.destination?.message}
            </p>
          </div>

          <div className="grid gap-2">
            <label htmlFor="custom_slug">CUSTOM SLUG (OPTIONAL)</label>
            <input
              {...register("custom_slug")}
              id="custom_slug"
              type="custom_slug"
              placeholder="my-custom-slug"
              className="outline-none w-full border border-gray/80 p-2 rounded-lg"
            />
            <p className="text-xs text-dark-gray">
              Leave blank to generate a random unique identifier.
            </p>
          </div>
          <button
            type="submit"
            className="py-2 w-full bg-primary rounded-lg text-white cursor-pointer hover:opacity-80 hover:shadow-sm flex items-center justify-center h-10"
          >
            <AiOutlineLoading3Quarters
              className={`${loading ? "block" : "hidden"} text-lg animate-spin`}
            />
            {loading ? "" : "Create Link"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateLink;
