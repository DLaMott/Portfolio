import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import npc from "../../Assets/Projects/npc.png";
import snake from "../../Assets/Projects/snake.png";
import imageAi from "../../Assets/Projects/imageAi.png";
import data from "../../Assets/Projects/data.png";
import space from "../../Assets/Projects/space.png";
import chip8 from "../../Assets/Projects/chip8.png";
import genconsumer from "../../Assets/Projects/ConsumerGenerator.PNG";
import restgen from "../../Assets/Projects/RestGenerator.PNG";
import kafkacon from "../../Assets/Projects/KafkaConsumer.PNG";

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
              imgPath={restgen}
              isBlog={false}
              title="Yeoman Spring MS Generator"
              description="As I make multiple Spring Rest Apis, I decided I wanted a yeoman generator more inline with development that I work on. This generator will build a
              spring rest api with ready to go CRUD operations and is built using Gradle. This generator has been published to the npm registry and is ready for use."
              ghLink="https://github.com/DLaMott/generator-spring-boot-rest-api"
              demoLink="https://github.com/DLaMott/generator-spring-boot-rest-api"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={kafkacon}
              isBlog={false}
              title="Spring Boot Kafka Consumer Showcase"
              description="As a developer I wanted to showcase an up-to-date Spring implementation of a kafka consumer utilizing Gradle. This repo can be utilized as an example for 
              error handling, payload consumption, and consumer configuration."
              ghLink="https://github.com/DLaMott/spring-boot-kafka-consumer"
              demoLink="https://github.com/DLaMott/spring-boot-kafka-consumer"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={genconsumer}
              isBlog={false}
              title="Yeoman Spring Kafka Consumer"
              description="As I make multiple Spring Kafka consumers, I noticed consumer setup can often be time consuming. This generator will build a
              spring kafka consumer with ready to go operations and is built using Gradle. This generator has been published to the npm registry and is ready for usage. 
              This was also linked to my Kafka consumer showcase to hopefully offer aid to other developers."
              ghLink="https://github.com/DLaMott/generator-spring-boot-kafka-consumer"
              demoLink="https://github.com/DLaMott/generator-spring-boot-kafka-consumer"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chip8}
              isBlog={false}
              title="Chip8"
              description="Chip8 emulator written in Java. This emulator supports the ability to load in additional rom files to allow for a multitude of games to be played. 
              This was one of my first projects created while studying Java."
              ghLink="https://github.com/DLaMott/Chip8"
              demoLink="https://github.com/DLaMott/Chip8"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={imageAi}
              isBlog={false}
              title="Open AI Discord Bot"
              description="Discord bot using the Open AI APIs built with Node.js. Currently this bot utilizes the open AI image generation and the text model. This AI bot is deployed using repl 24/7 and has live health monitoring features
              with the aid of uptime-robot."
              ghLink="https://github.com/DLaMott/OpenAIDiscordBot"
              demoLink="https://github.com/DLaMott/OpenAIDiscordBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={npc}
              isBlog={false}
              title="NPC Generation"
              description="A Spigot plugin with over 170,000+ downloads built with Java. This server side plugin is used to allow the creation of custom NPCs in minecraft."
              ghLink="https://github.com/DLaMott/Npc"
              demoLink="https://github.com/DLaMott/Npc"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={data}
              isBlog={false}
              title="Data structures and Algorithim in Java"
              description="This repo was created to aid newer developers in understanding data structures and algorithims in Java. This repo is also used as a study tool for myself to keep
              the content fresh!"
              ghLink="https://github.com/DLaMott/DataStructures"
              demoLink="https://github.com/DLaMott/DataStructures"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={snake}
              isBlog={false}
              title="Snake"
              description="The classic Snake Game written in JS. This is deployed within my personal site and can be played using the browser and or a mobile device."
              demoLink="https://dlamott.github.io/snake.html"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={space}
              isBlog={false}
              title="Space Invaders"
              description="The classic Space invaders written in JS. This is deployed within my personal site and can be played using the browser and or a mobile device."
              demoLink="https://dlamott.github.io/SpaceInvaders.html"
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
