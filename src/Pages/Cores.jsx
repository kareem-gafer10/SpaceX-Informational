import { useState, useEffect } from "react";
import axios from "axios";
import LoadingState from "../LoadingState";
const Cores = () => {
  const [cores, setCores] = useState([]);

  const fetchCores = async () => {
    const { data } = await axios.get("https://api.spacexdata.com/v4/cores");
    setCores(data);
  };

  useEffect(() => {
    fetchCores();
  }, []);

  return (
    <>
      {!cores ?  <LoadingState/> :
      <section className="py-20">
          <h1 className=" text-center text-white heading mb-12">Cores</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5 max-width">
            {cores.map(
              ({
                id,
                status,
                serial,
                launches,
                last_update,
                asds_landings,
                rtls_landings,
                reuse_count,
              }) => (
                <article key={id} className="articles">
                  <h2 className="text-xl font-bold mb-5">
                    {serial}
                  </h2>
                  <p></p>
                  <ul>
                    <li className="mb-1">Reused {reuse_count} times</li>
                    <li className="mb-1">{launches.length} launches</li>
                    <li className="mb-1">{asds_landings} ASDS landings</li>
                    <li className="mb-1">{rtls_landings} RTLS landings</li>
                    {status === "active" ? (
                      <li className="text-emerald-500">Status: Active</li>
                    ) : (
                      <li className="text-rose-500">Status :{status}</li>
                    )}
                  </ul>
                  <p className="mt-5 opacity-75">{last_update}</p>
                </article>
              )
            )}
          </div>
        </section>
      }
        <section className="py-20">
          <h1 className=" text-center text-white heading mb-12">Cores</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5 max-width">
            {cores.map(
              ({
                id,
                status,
                serial,
                launches,
                last_update,
                asds_landings,
                rtls_landings,
                reuse_count,
              }) => (
                <article key={id} className="articles">
                  <h2 className="text-xl font-bold mb-5">
                    {serial}
                  </h2>
                  <p></p>
                  <ul>
                    <li className="mb-1">Reused {reuse_count} times</li>
                    <li className="mb-1">{launches.length} launches</li>
                    <li className="mb-1">{asds_landings} ASDS landings</li>
                    <li className="mb-1">{rtls_landings} RTLS landings</li>
                    {status === "active" ? (
                      <li className="text-emerald-500">Status: Active</li>
                    ) : (
                      <li className="text-rose-500">Status :{status}</li>
                    )}
                  </ul>
                  <p className="mt-5 opacity-75">{last_update}</p>
                </article>
              )
            )}
          </div>
        </section>
    </>
  );
};

export default Cores;
