import React from "react";
import { Container, Col } from "reactstrap";
import Navigation from "../components/navigation";
import Footer from "./footer";
const Main = props => {
  return (
    <>
      <Navigation />
      <Container fluid={true} className="mt-1">
        <Col>{props.children}</Col>
      </Container>
      <Footer />
    </>
  );
};
export default Main;
