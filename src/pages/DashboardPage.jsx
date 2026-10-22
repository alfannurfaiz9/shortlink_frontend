import { IoMdSearch } from "react-icons/io";
import LinkCard from "../components/LinkCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLink } from "../redux/slices/userSlice";
import { useSearchParams } from "react-router";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const userLink = useSelector((state) => state.userState.links);

  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get("slug") || "";

  useEffect(() => {
    (() => {
      let params = "";
      if (slug.length) {
        params = slug;
      }

      const debounce = setTimeout(
        () => {
          dispatch(getUserLink({ params: `?slug=${params}` }));
        },
        params ? 1000 : 0,
      );

      return () => clearTimeout(debounce);
    })();
  }, [dispatch, slug]);
  return (
    <section className="section-container min-h-svh bg-gray/30">
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
              <p className="text-2xl text-primary font-bold">
                {userLink?.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg text-sm shadow-sm">
            <IoMdSearch className="text-xl text-dark-gray" />
            <input
            value={slug}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);

                if (e.target.value) {
                  newParams.set("slug", e.target.value);
                } else {
                  newParams.delete("slug");
                }

                setSearchParams(newParams);
              }}
              type="text"
              placeholder="Search by name or URL..."
              className="w-full h-full outline-none"
            />
          </div>
          {userLink?.map((el, idx) => (
            <LinkCard
              key={idx}
              id={el.id}
              slug={el.slug}
              original_url={el.original_url}
              created_at={el.created_at}
            />
          ))}
        </div>
        <div className="text-sm flex justify-between text-dark-gray my-8">
          <button className="cursor-pointer">Prev Page</button>
          <div className="flex gap-2">
            <p className="py-2 px-3 font-bold bg-accent-2/50 rounded-lg text-primary/50 cursor-pointer">
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
