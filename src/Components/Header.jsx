import {React, useEffect, useState} from "react";
import { Navbar, Nav, Button, Stack, Container } from "react-bootstrap";
import JsonDropDown from "./JsonDropDown.jsx";
import XmlDropDown from "./XmlDropDown.jsx";
import Logo from "./Logo.jsx";

function Header({setSelectedValue, validateInput, 
          inputPayload, setFormattedValue,
          setJsonDropDownVal}) {
  const [isJsonDisabled, setIsJsonDisabled] = useState(false);

  const handleNavClick = (value) => {
    setSelectedValue(value);
    if(value === "xml"){
      setIsJsonDisabled(true);
    }else{
      setIsJsonDisabled(false);
    }
  };
  useEffect(() => {
      //Clearing the values when the selected value changes
      setSelectedValue("json");
  }, []);
  return (
    <>
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="px-3"
      style={{ minHeight: "50px" }}
    >
      <Container fluid>
        <Stack
          direction="horizontal"
          gap={3}
          className="w-100 align-items-center justify-content-between"
        >
          <Stack direction="horizontal" gap={3} className="align-items-center">
            <Navbar.Brand href="#home">
              <Logo />
            </Navbar.Brand>
          </Stack>
          <Stack direction="horizontal" gap={5}>
            <Nav.Link onClick={() => handleNavClick("json")} className="text-light">
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("json")} className="text-light">
              Json Formatter
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("xml")} className="text-light">
              Xml Formatter
            </Nav.Link>
            <JsonDropDown validateInput={validateInput} inputPayload={inputPayload} 
                          setFormattedValue={setFormattedValue} isJsonDisabled={isJsonDisabled}
                          setJsonDropDownVal ={setJsonDropDownVal}/>
            <XmlDropDown/>
          </Stack>
        </Stack>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;
