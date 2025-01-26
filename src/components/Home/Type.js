import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Java Developer",
          "Backend and Frontend Devloper", 
          "IAM Engineer II",
          "Identity Expert",
          "Kafka Expert",
          "Spring Enthusiast",       
          "Devops Practitioner",
          "Cloud Technology Expert",             
          "Open Source Contributor",
          "Programming Enthusiast",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
