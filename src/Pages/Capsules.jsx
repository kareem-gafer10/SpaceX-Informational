import { useState, useEffect } from "react";

import axios from "axios";
import LoadingState from "../LoadingState";

const Capsules = () => {
  const [capsules, setCapsules] = useState([]);

  const fetchCapsules = async () => {
    const { data } = await axios.get("https://api.spacexdata.com/v4/capsules");
    setCapsules(data);
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  return (
    <>
      {!capsules ? (
        <LoadingState />
      ) : (
        <section className="py-20">
          <h1 className=" text-center text-white heading mb-12">Capsules</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5 max-width">
            {capsules.map(
              ({
                id,
                type,
                status,
                serial,
                launches,
                last_update,
                land_landings,
                water_landings,
                reuse_count,
              }) => (
                <article key={id} className="articles">
                  <h2 className="text-xl font-bold mb-5">
                    {type},
                    <span className="text-base opacity-75 font-light">
                      {serial}
                    </span>
                  </h2>
                  <ul>
                    <li className="mb-1">{launches.length} launches</li>
                    <li className="mb-1">{land_landings} land landings</li>
                    <li className="mb-1">{water_landings} water landings</li>
                    <li className="mb-1">Reused {reuse_count} times</li>
                    {status === "active" ? (
                      <li className="text-emerald-500">Status: Active</li>
                    ) : (
                      <li className="text-rose-500">Status: Retired</li>
                    )}
                  </ul>
                  <p className="mt-5 opacity-75">{last_update}</p>
                </article>
              )
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Capsules;
