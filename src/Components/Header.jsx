import React from "react";
import { Navbar, Nav, Button, Stack, Container } from 'react-bootstrap';
import JsonDropDown from "./JsonDropDown.jsx";
import XmlDropDown from "./XmlDropDown.jsx";
import Logo from "./Logo.jsx";

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3" style={{ minHeight: '50px' }}>
      <Container fluid>
        <Stack direction="horizontal" gap={3} className="w-100 align-items-center justify-content-between">
          <Stack direction="horizontal" gap={3} className="align-items-center">
            <Navbar.Brand href="#home">
              <Logo />
            </Navbar.Brand>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <Nav.Link href="#home" className="text-light">Home</Nav.Link>
            <Nav.Link href="#home" className="text-light">Json Formatter</Nav.Link>
            <Nav.Link href="#home" className="text-light">Xml Formatter</Nav.Link>
            <JsonDropDown />
            <XmlDropDown />
          </Stack>
        </Stack>
      </Container>
    </Navbar>

  );
}

export default Header;
