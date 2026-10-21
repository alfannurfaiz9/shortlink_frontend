import { FaCheckCircle } from "react-icons/fa";
import companyImage from "../../assets/company.png";

const AboutSection = () => {
  return (
    <section className="section-container">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <img src={companyImage} alt="image" />
        <div className="grid gap-4 text-dark-gray">
          <p className="text-md font-semibold">DATA DRIVEN INSIGHT</p>
          <p className="text-4xl font-extrabold text-dark">
            Observe your link architecture in real- time.
          </p>
          <p>
            Every click is a data point. Our dashboard provides surgical
            precision into where your traffic originates, who is engaging, and
            how your team communications are performing across the globe.
          </p>
          <div className="flex gap-2 items-center">
            <FaCheckCircle className="text-lg text-primary" />
            <p className="text-dark">Geographic Distribution Maps</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaCheckCircle className="text-lg text-primary" />
            <p className="text-dark">Device & Browser Breakdown</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaCheckCircle className="text-lg text-primary" />
            <p className="text-dark">UTM Parameter Tracking</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
