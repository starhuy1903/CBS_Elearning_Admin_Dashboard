import React from "react";

const Home = () => {
  console.log("Home");
  return (
    <div
      style={{
        backgroundImage:
          'url("https://thumbs.dreamstime.com/b/e-learning-concept-white-background-drawn-79671281.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "150%, cover",
        height: "90vh",
        backgroundPosition: "center",
      }}
      className="w-full"
    ></div>
  );
};

export default Home;
