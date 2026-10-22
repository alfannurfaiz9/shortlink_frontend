import { IoMdSearch } from "react-icons/io";
import LinkCard from "../components/LinkCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLink } from "../redux/slices/userSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const userLink = useSelector((state) => state.userState.links);

  useEffect(() => {
    dispatch(getUserLink());
  }, [dispatch]);
  return (
    <section className="section-container bg-gray/30">
      <div className="flex flex-col justify-between overflow-hidden lg:gap-8 lg:w-6/12 mx-auto">
        <div className="grid gap-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">My Links</h2>
              <p className="text-dark-gray">
                Manage and track your shortened digital assets.
              </p>
            </div>
            <div>
              <p className="text-dark-gray font-semibold">TOTAL ACTIVE</p>
              <p className="text-2xl text-primary font-bold">{userLink?.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg text-sm shadow-sm">
            <IoMdSearch className="text-xl text-dark-gray" />
            <input
              type="text"
              placeholder="Search by name or URL..."
              className="w-full h-full outline-none"
            />
          </div>
          {userLink?.map((el, idx) => (
            <LinkCard
              key={idx}
              slug={el.slug}
              original_url={el.original_url}
              created_at={el.created_at}
            />
          ))}
        </div>
        <div className="text-sm flex justify-between text-dark-gray">
          <button className="cursor-pointer">Prev Page</button>
          <div className="flex gap-2">
            <p className="py-2 px-3 font-bold bg-accent-2 rounded-lg text-primary cursor-pointer">
              1
            </p>
            <p className="py-2 px-3 cursor-pointer">of</p>
            <p className="py-2 px-3 font-bold rounded-lg cursor-pointer">5</p>
          </div>
          <button className="cursor-pointer">Next Page</button>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
