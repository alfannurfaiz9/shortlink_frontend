import { IoMdLink } from "react-icons/io";

const HeroSection = () => {
  return (
    <section className="container !py-28 bg-primary/10">
      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-extrabold">
          Shorten URLs. <span className="text-primary">Share Easily.</span>
        </h2>
        <div className="lg:w-6/12">
          <p className="text-dark-gray">
            Create short, memorable links for your team communications.
            Transform long, cumbersome URLs into powerful digital assets that
            drive engagement.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="py-2 px-4 bg-primary rounded-lg text-white hover:opacity-80 cursor-pointer"
          >
            Get Started
          </button>
          <button
            type="button"
            className="py-2 px-4 border border-primary/20 rounded-lg text-primary hover:opacity-80 cursor-pointer"
          >
            Learn More
          </button>
        </div>
        <div className="bg-white lg:w-6/12 mx-auto flex items-center justify-between p-2 lg:p-3 rounded-lg">
          <IoMdLink className="text-2xl" />
          <input
            type="text"
            placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
            className="w-full h-full outline-none mx-4"
          />
          <button
            type="button"
            className="py-2 px-4 bg-primary text-white rounded-lg hover:opacity-80 cursor-pointer"
          >
            Shorten
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
