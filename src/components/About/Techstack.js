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

  const[show, setShow] = React.useState(false);

  const handleClick = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <BootstrapTooltip open={show} onClick={handleClick} title="Terraform" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiTerraform /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="JS" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><DiJavascript1 /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Node" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><DiNodejs /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="MySql" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><DiMysql /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Java" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiJava /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Git" placement="top">
      <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><DiGit /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Kafka" placement="top">
      <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiApachekafka /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Python" placement="top">
      <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><DiPython /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Spring" placement="top">
      <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiSpring /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Kubernetes" placement="top">
      <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiKubernetes /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Docker" placement="top">
      <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiDocker /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="AWS" placement="top">
      <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiAmazonaws /></div>
        </BootstrapTooltip>
      </Col>
    </Row>
  );
}

export default Techstack;
