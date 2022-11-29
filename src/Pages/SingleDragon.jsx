import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingState from "../LoadingState";

const SingleDragon = () => {
  const [singleDragon, setSingleDragon] = useState(null);
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(0)
  const { id } = useParams();

  const fetchSingleDragons = async () => {
    const { data } = await axios.get(
      `https://api.spacexdata.com/v4/dragons/${id}`
    );
    setSingleDragon(data);
  };

  useEffect(() => {
    fetchSingleDragons();
  }, [id]);

  return (
    <>
      {!singleDragon ? (
        <LoadingState />
      ) : (
        <section className="max-width py-20 grid sm:grid-cols-1 md:grid-cols-2 md:gap-10">
          <article className="mx-5 lg:mx-0  w-full">
            <h1 className="heading mb-8">{singleDragon.name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 text-white">
              First Flight Date: {singleDragon.first_flight}
            </h2>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 ">
            <ul className="text-small text-white opacity-75 
            capitalize flex flex-col justify-start items-start gap-3">
                <li>Type: {singleDragon.type}</li>
                <li>Crew: {singleDragon.crew_capacity}</li>
                {!toggle && <li>Dry Mass: {singleDragon.dry_mass_kg}kg</li>}
                {toggle && <li>Dry Mass: {singleDragon.dry_mass_lb}lb</li>}
                {singleDragon.active ? (<li className="text-emerald-500">Active</li>) 
                : ( <li className="text-rose-500">Inactive</li>)}
                <li className="mt-3">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    href={singleDragon.wikipedia}
                  >
                    Wikipedia
                  </a>
                </li>
            </ul>

            <ul className="bg-black text-white text-sm opacity-75 p-3 rounded mr-10 md:mr-0 ">
                <h3 className=" font-bold opacity-100 text-xl uppercase mb-3">Heat shield details</h3>
                <li className="mb-3"> Material: {singleDragon.heat_shield.material}</li>
                <li className="mb-3">Size: {singleDragon.heat_shield.size_meters}m</li>
                <li className="mb-3" >Temperature: {singleDragon.heat_shield.temp_degrees} degrees</li>
                <li className="mb-3">Dev Partner: {singleDragon.heat_shield.dev_partner}</li>
            </ul>
    </div>

            <p className="opacity-75 text-white mt-5 mb-8 md:mx-0 mx-4">
              {singleDragon.description}
            </p>


        
    <div className="text-white opacity-75 text-sm  my-20">
            {/* Metric Units */}
            {!toggle &&  
            <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 ">
                    <li> Launch Payload Mass: {singleDragon.launch_payload_mass.kg} Kg</li>
                    <li>Return Payload Mass: {singleDragon.return_payload_mass.kg} Kg</li>
                    <li>Pressurized Capsule Payload Volume:  
                     {singleDragon.pressurized_capsule.payload_volume.cubic_meters} m<sup>3</sup>
                    </li>
                    <li>Height With Trunk:{singleDragon.height_w_trunk.meters}m</li>
                    <li>Launch Payload Volume:{singleDragon.launch_payload_vol.cubic_meters} m<sup>3</sup></li>
                    <li>Return Payload Volume: {singleDragon.return_payload_vol.cubic_meters}m<sup>3</sup></li>
                    <li>Trunk Volume: {singleDragon.trunk.trunk_volume.cubic_meters} m<sup>3</sup></li>
                    <li>Diameter: {singleDragon.diameter.meters}m</li>
                </ul>
            }
                


            {/* Imperial Units */}
                {toggle && 
            <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-3"> 
                     <li> Launch Payload Mass: {singleDragon.launch_payload_mass.lb}lb</li>
                    <li>Return Payload Mass: {singleDragon.return_payload_mass.lb}lb</li>
                    <li>Pressurized Capsule Payload Volume: 
                    {singleDragon.pressurized_capsule.payload_volume.cubic_feet}
                    </li>
                    <li>Height With Trunk: {singleDragon.height_w_trunk.feet}ft</li>
                    <li>Launch Payload Volume:{singleDragon.launch_payload_vol.cubic_feet}ft</li>
                    <li>Return Payload Volume: {singleDragon.return_payload_vol.cubic_feet}ft</li>
                    <li>Trunk Volume: {singleDragon.trunk.trunk_volume.cubic_feet}ft</li>
                    <li>Diameter: {singleDragon.diameter.feet}ft</li>
                </ul>
                }   
    </div>

            <ul className="mt-8 flex items-center justify-start gap-4">
                <li>
                    <button onClick={() => setToggle(!toggle)} className="btn mr-10 mb-10 md:mb-0">
                    {toggle ? "Show Metric Units" : "Show Imperial Units"}
                     </button>
                    <Link className="text-white opacity-75 text-sm hover:opacity-100"
                    to='/dragons'> &larr; Back</Link>
             </li>
            </ul>
          </article>


          <article className=" mx-5 lg:mx-0">
            <img
              src={singleDragon.flickr_images[value]}
              alt={singleDragon.name}
              className="h-96 object-cover"
            />

            <ul className="flex flex-wrap items-center justify-center gap-3 mt-10">
              {singleDragon.flickr_images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setValue(index)}
                  className={`${index === value && "p-1 bg-white"}`}
                >
                  <img
                    src={image}
                    alt={singleDragon.name}
                    className="w-28 h-20 object-cover cursor-pointer"
                  />
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  );
};

export default SingleDragon;
