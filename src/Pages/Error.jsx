import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className=" mb-5 text-white text-lg">Sorry, the requested resource could not be found</h1>
        <Link className="btn" to="/">
          &larr; Back to Homepage
        </Link>
      </section>
    </>
  );
};

export default Error;
