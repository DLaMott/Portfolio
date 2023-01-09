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
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <BootstrapTooltip disableFocusListener title="Pycharm" placement="top">
          <div><SiPycharm /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="VS Code" placement="top">
        <div><SiVisualstudiocode /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Postman" placement="top">
        <div><SiPostman /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Vercel" placement="top">
        <div><SiVercel /></div>
        </BootstrapTooltip>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <BootstrapTooltip disableFocusListener title="Intellij" placement="top">
        <div><SiIntellijidea /></div>
        </BootstrapTooltip>
      </Col>
    </Row>
  );
}

export default Toolstack;
