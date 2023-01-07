import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Chip8"
              description="Chip8 emulator in Java"
              ghLink="https://github.com/DLaMott/Chip8"
              demoLink="https://github.com/DLaMott/Chip8"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Open AI Discord Bot"
              description="Discord bot using the Open AI APIs"
              ghLink="https://github.com/DLaMott/OpenAIDiscordBot"
              demoLink="https://github.com/DLaMott/OpenAIDiscordBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="NPC Generation"
              description="Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage"
              ghLink="https://github.com/DLaMott/Npc"
              demoLink="https://github.com/DLaMott/Npc"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Data structures and Algorithim in Java"
              description=""
              ghLink="https://github.com/DLaMott/DataStructures"
              demoLink="https://github.com/DLaMott/DataStructures"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Snake"
              description=""
              demoLink="https://github.com/DLaMott/DataStructures"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Space Invaders"
              description=""
              demoLink="https://github.com/DLaMott/DataStructures"
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
