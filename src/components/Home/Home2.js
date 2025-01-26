import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/dylanpic.png";
import Tilt from "react-parallax-tilt";
import Toolstack from "../About/Toolstack";
import Techstack from "../About/Techstack";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>

      <Col md={12} className="home-about-social">
            <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />

        </Col>


        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with programming and I have at least learned a few things, I think… 🤷‍♂️
              <br />
              <br />The language I use the most and am strongest in is
              <i>
                <b className="purple"> Java. </b>
              </i>
              <br />However, I have had much success with other programming languages such as:
              <i>
                <b className="purple"> JS, Python, and Swift. </b>
              </i>
              <br />
              <br />
              My field of interests are in: &nbsp;
              <i>
                <b className="purple">Web Applications</b>, <b className="purple">Cyber Security</b>, <b className="purple">Microservice technologies</b> and
                also in areas related to{" "}
                <b className="purple">
                  Game and AI development.
                </b>
              </i>
              <br />
              <br />
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/DLaMott"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/dylan-lamott-b39b47200/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
