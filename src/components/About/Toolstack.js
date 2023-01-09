import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiPycharm,
  SiVisualstudiocode,
  SiPostman,
  SiIntellijidea,
  SiVercel,
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


function Toolstack() {

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
        <BootstrapTooltip title="Pycharm" placement="top" open={show} onClick={handleClick}>
          <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiPycharm /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="VS Code" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiVisualstudiocode /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Postman" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiPostman /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Vercel" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiVercel /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip open={show} onClick={handleClick} title="Intellij" placement="top">
        <div onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} ><SiIntellijidea /></div>
        </BootstrapTooltip>
      </Col>
    </Row>
  );
}

export default Toolstack;

