import { FaPencilAlt } from "react-icons/fa";
import { IoFlashOutline } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";

const Features = () => {
  return (
    <section className="section-container bg-gray/30 flex flex-col gap-8">
      <div>
        <h2 className="text-sm font-semibold text-primary">ARCHITECTURAL FEATURES</h2>
        <p className="text-3xl font-bold">Built for Enterprise Precision</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="grid gap-2 p-4 rounded-lg bg-white shadow-sm">
          <div className="p-2 w-fit bg-accent-2 rounded-md">
            <IoFlashOutline className="text-xl text-primary" />
          </div>
          <p className="text-xl font-semibold">Easy Create</p>
          <p>
            Instantly generate high-performance short links with a single click
            or through our surgical API endpoints.
          </p>
        </div>
        <div className="grid gap-2 p-4 rounded-lg bg-white shadow-sm">
          <div className="p-2 w-fit bg-accent-2 rounded-md">
            <FaPencilAlt className="text-xl text-primary" />
          </div>
          <p className="text-xl font-semibold">Custom Slugs</p>
          <p>
            Maintain brand authority with readable, custom link endings that
            resonate with your digital audience.
          </p>
        </div>
        <div className="grid gap-2 p-4 rounded-lg bg-white shadow-sm">
          <div className="p-2 w-fit bg-accent-1 rounded-md">
            <RiTeamLine className="text-xl text-black" />
          </div>
          <p className="text-xl font-semibold">Custom Slugs</p>
          <p>
            Maintain brand authority with readable, custom link endings that
            resonate with your digital audience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
