import {React, useEffect, useState} from "react";
import { Navbar, Nav, Button, Stack, Container } from "react-bootstrap";
import JsonDropDown from "./JsonDropDown.jsx";
import XmlDropDown from "./XmlDropDown.jsx";
import YamlDropDown from "./YamlDropDown.jsx";
import Logo from "./Logo.jsx";
import { Link } from 'react-router-dom'; // if using React Router

function Header({setSelectedValue, validateInput, 
          inputPayload, setFormattedValue,
          setDropDownVal,setLoading}) {
  const [isJsonDisabled, setIsJsonDisabled] = useState(false);
  const [isXmlDisabled, setIsXmlDisabled] = useState(false);
  const [isYamlDisabled, setIsYamlDisabled] = useState(false);

  const handleNavClick = (value) => {
    setSelectedValue(value);
    setDropDownVal(value);
    if(value === "xml"){
      setIsJsonDisabled(true);
      setIsYamlDisabled(true);
      setIsXmlDisabled(false);
    }else if(value === "json"){
      setIsXmlDisabled(true);
      setIsYamlDisabled(true);
      setIsJsonDisabled(false);
    }else{
      setIsJsonDisabled(true);
      setIsXmlDisabled(true);
      setIsYamlDisabled(false);
    }
  };
  useEffect(() => {
      //Clearing the values when the selected value changes
      setSelectedValue("json");
      setIsXmlDisabled(true);
      setIsYamlDisabled(true);
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
            {/* <Nav.Link onClick={() => handleNavClick("json")} className="text-light">
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("json")} className="text-light">
              Json Formatter
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("xml")} className="text-light">
              Xml Formatter
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick("yaml")} className="text-light">
              Yaml Formatter
            </Nav.Link> */}
            <Link to="/" className="nav-link text-light" onClick={() => handleNavClick("json")}>
                Home
            </Link>
            <Link to="/" className="nav-link text-light" onClick={() => handleNavClick("json")}>
              Json Formatter
            </Link>
            <Link to="/" className="nav-link text-light" onClick={() => handleNavClick("xml")}>
              Xml Formatter
            </Link>
            <Link to="/" className="nav-link text-light" onClick={() => handleNavClick("yaml")}>
              Yaml Formatter
            </Link>
            <JsonDropDown validateInput={validateInput} inputPayload={inputPayload} 
                          setFormattedValue={setFormattedValue} isJsonDisabled={isJsonDisabled}
                          setDropDownVal ={setDropDownVal} setLoading={setLoading}/>
            <XmlDropDown validateInput={validateInput} inputPayload={inputPayload} 
                          setFormattedValue={setFormattedValue} isXmlDisabled={isXmlDisabled}
                          setDropDownVal ={setDropDownVal} setLoading={setLoading}/>
            <YamlDropDown validateInput={validateInput} inputPayload={inputPayload} 
                          setFormattedValue={setFormattedValue} isYamlDisabled={isYamlDisabled}
                          setDropDownVal ={setDropDownVal} setLoading={setLoading}/>
          </Stack>
        </Stack>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;
