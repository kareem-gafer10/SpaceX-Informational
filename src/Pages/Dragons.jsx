import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingState from "../LoadingState";

const Dragons = () => {
  const [dragons, setDragons] = useState([]);

  const fetchDragons = async () => {
    const { data } = await axios.get("https://api.spacexdata.com/v4/dragons");
    setDragons(data);
  };

  useEffect(() => {
    fetchDragons();
  }, []);

  return (
    <>
      {!dragons ? (
        <LoadingState />
      ) : (
        <section className="py-20">
          <h1 className=" text-center text-white heading mb-12">Dragons</h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 px-5">
            {dragons.map(({ id, name, flickr_images, description }) => (
              <Link to={`/dragons/${id}`} key={id}>
                <article>
                  <img
                    src={flickr_images[0]}
                    alt={name}
                    className=" h-72 object-cover"
                  />
                  <div className="bg-black p-5">
                    <h2 className="text-white text-lg mb-3 font-bold tracking-wide">
                      {name}
                    </h2>
                    <p className="text-white opacity-75 mb-8">{`${description.substring(
                      0,200
                    )}...`}</p>
                    <Link to={`/dragons/${id}`} className="btn">
                      Read More &rarr;
                    </Link>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Dragons;
