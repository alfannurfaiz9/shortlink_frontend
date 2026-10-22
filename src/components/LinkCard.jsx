import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { IoBarChartSharp, IoCopy } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router";

const LinkCard = ({ slug, original_url, created_at }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between flex-wrap">
      <div className="grid gap-2 ">
        <Link
          to={`${import.meta.env.VITE_API_URL}/${slug}`}
          className="flex items-center gap-2 font-bold text-primary"
        >
          <IoMdLink />
          <p>{slug}</p>
        </Link>
        <p>{original_url}</p>
        <div className="flex gap-4 text-dark-gray tracking-widest">
          <div className="flex items-center gap-2">
            <SlCalender />
            <p>{moment(created_at).format("MMMM DD, YYYY")}</p>
          </div>
          <div className="flex items-center gap-2">
            <IoBarChartSharp />
            <p>1.2k CLICKS</p>
          </div>
        </div>
      </div>
      <div className="mt-4 lg:my-0 flex gap-4 lg:gap-6 text-xl text-dark-gray items-center justify-center">
        <IoCopy className="cursor-pointer hover:opacity-80 p-2 text-4xl text-dark/60 bg-accent-2/40 rounded-lg lg:text-4xl" />
        <FaTrashAlt className="cursor-pointer hover:opacity-80" />
      </div>
    </article>
  );
};

export default LinkCard;
