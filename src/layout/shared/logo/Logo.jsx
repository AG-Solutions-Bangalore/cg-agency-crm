import { styled } from "@mui/material";

import { Link } from "react-router-dom";
import logstrucn from "../../../assets/logos/creativelogo.png";
const LinkStyled = styled(Link)(() => ({
  height: "13px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));
const LargeLinkStyled = styled(Link)(() => ({
  height: "19px",
  width: "63px",
  overflow: "hidden",
  display: "block",
}));

const Logo = ({ isCollapsed }) => {
  return (
    <>
      {!isCollapsed ? (
        <LinkStyled to="/home">
          <img src={'https://creativegarments.in/agency/img/logo.webp'} alt="logo" className="" priority />
        </LinkStyled>
      ) : (
        <LargeLinkStyled to="/home">
          <img src={logstrucn} alt="logo"  priority />
        </LargeLinkStyled>
      )}
    </>
  );
};

export default Logo;
