import React from "react";
import videoBg from "../assets/videos/videoBg.mp4";

const Login = () => {
  return (
    <div className="w-full h-screen">
      <video
        className="w-full h-full object-cover"
        src={videoBg}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white">
        <form className="flex flex-col items-center">
          <h3 className="font-semibold text-3xl mb-6 text-teal-400">Sign in</h3>
          <div className="flex flex-col">
            <label htmlFor="">Username</label>
            <input
              className="bg-transparent border-slate-300 border px-4 py-2 my-2 rounded outline-0"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              className="bg-transparent border-slate-300 border  px-4 py-2 my-2 rounded outline-0"
              type="password"
            />
          </div>
          <button
            type="button"
            className="bg-teal-400 px-8 py-4 mt-4 rounded-xl text-center font-bold text-lg hover:bg-white hover:text-teal-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
