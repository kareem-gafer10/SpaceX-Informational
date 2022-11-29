import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingState from "../LoadingState";

const Crew = () => {
  const [crew, setCrew] = useState([]);

  const fetchCrew = async () => {
    const { data } = await axios.get("https://api.spacexdata.com/v4/crew");
    setCrew(data);
  };

  useEffect(() => {
    fetchCrew();
  }, []);

  return (
    <>
      {!crew ? (
        <LoadingState />
      ) : (
        <section className="py-20">
          <h1 className=" text-center text-white heading mb-12">Crew</h1>
          <div className="max-width grid sm:grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 px-5">
            {crew.map(({ id, name, image }) => (
              <Link key={id} to={`/crew/${id}`}>
                <article className="relative">
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-96 w-full object-cover"
                  />
                  <h2 className="absolute bottom-5 left-5 font-bold
                   text-white text-lg tracking-wide text-center">
                    {name}
                  </h2>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Crew;
