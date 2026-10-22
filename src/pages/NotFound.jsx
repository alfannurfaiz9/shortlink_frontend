import { IoMdLink } from "react-icons/io";
import { MdOutlineAnalytics } from "react-icons/md";
import { SiDevelopmentcontainers } from "react-icons/si";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="section-container h-svh lg:h-fit bg-gray/30">
      <div className="lg:w-5/12 mx-auto flex flex-col items-center justify-center gap-4">
        <img src="/error-image.png" alt="error-image" />
        <h2 className="text-3xl text-primary font-extrabold">404</h2>
        <p className="text-xl">Page Not Found</p>
        <p className="text-dark-gray text-center">
          The page you're looking for doesn't exist. It may have been moved,{" "}
          <br />
          deleted, or the link might be broken.
        </p>
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="bg-primary text-white py-2 px-4 rounded-lg cursor-pointer hover:opacity-80 hover:shadow-sm"
          >
            ← Go to Dashboard
          </Link>
          <button className="text-primary border border-dark-gray py-2 px-4 rounded-lg cursor-pointer hover:opacity-80 hover:shadow-sm">
            Report an Issue
          </button>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 my-8">
          <div className="grid bg-white shadow-sm p-3 rounded-lg">
            <MdOutlineAnalytics className="text-xl text-primary" />
            <p className="font-bold">Check Analytics</p>
            <p className="text-sm text-dark-gray">
              Track your active links and traffic sources in real-time.
            </p>
          </div>
          <div className="grid bg-white shadow-sm p-3 rounded-lg">
            <IoMdLink className="text-xl text-primary" />
            <p className="font-bold">New ShortLink</p>
            <p className="text-sm text-dark-gray">
              Create a brand new architected URL in seconds.
            </p>
          </div>
          <div className="grid bg-white shadow-sm p-3 rounded-lg">
            <SiDevelopmentcontainers className="text-xl text-primary" />
            <p className="font-bold">Developer API</p>
            <p className="text-sm text-dark-gray">
              Integrate our link infrastructure into your apps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
