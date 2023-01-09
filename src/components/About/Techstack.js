import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMysql,
  DiPython,
  DiGit,
} from "react-icons/di";
import {
  SiTerraform,
  SiSpring,
  SiApachekafka,
  SiJava,
  SiKubernetes,
  SiDocker,
  SiAmazonaws,
} from "react-icons/si";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { hexToRgb, styled } from '@mui/material/styles';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: hexToRgb("#c770f0"),
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: hexToRgb("#c770f0"),
  },
}));



function Techstack() {

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <BootstrapTooltip disableFocusListener enterDelay={0} title="Terraform" placement="top">
        <div><SiTerraform /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="JS" placement="top">
        <div><DiJavascript1 /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Node" placement="top">
        <div><DiNodejs /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="MySql" placement="top">
        <div><DiMysql /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Java" placement="top">
        <div><SiJava /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Git" placement="top">
      <div><DiGit /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Kafka" placement="top">
      <div><SiApachekafka /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Python" placement="top">
      <div><DiPython /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Spring" placement="top">
      <div><SiSpring /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Kubernetes" placement="top">
      <div><SiKubernetes /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Docker" placement="top">
      <div><SiDocker /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="AWS" placement="top">
      <div><SiAmazonaws /></div>
        </BootstrapTooltip>
      </Col>
    </Row>
  );
}

export default Techstack;
