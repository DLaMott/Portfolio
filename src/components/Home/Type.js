import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Java Developer",
          "IAM Engineer",
          "Software Engineer",
          "Open Source Contributor",
          "Programming Enthusiast",
          "Highly Motivated",  
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
