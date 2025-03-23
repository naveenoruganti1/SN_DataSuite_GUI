import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import vkbeautify from "vkbeautify";
import  BodyButtons from "./BodyButtons.jsx";

const Body = ({ selectedValue }) => {
  const [tabSpace, setTabSpace] = useState(2);
  const [inputValue, setInputValue] = useState('');
  const [formattedValue, setFormattedValue] = useState("");
  useEffect(() => {
    setInputValue("");
    setFormattedValue("");
  }, [selectedValue]);
  const handleFormat = () => {
    try {
      if (selectedValue === "json") {
        const parsedJson = JSON.parse(inputValue);
        const formatted = vkbeautify.json(JSON.stringify(parsedJson), tabSpace);
        setFormattedValue(formatted);
      } else if (selectedValue === "xml") {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(inputValue, "application/xml");
        const errorNode = xmlDoc.getElementsByTagName("parsererror");
        if (errorNode.length) {
          alert("Invalid XML. Please check your input.");
          return;
        }
  
        const formatted = vkbeautify.xml(inputValue, tabSpace);
        setFormattedValue(formatted);
      }
    } catch (error) {
      alert(`Invalid ${selectedValue.toUpperCase()}! Please check your input.`);
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col md={5}>
          <h5>Input {selectedValue.toUpperCase()}</h5>
          <CodeMirror
            value={inputValue}
            height="500px"
            options={{ mode: selectedValue === "json" ? "application/json" : "application/xml", lineNumbers: true }}
            theme={oneDark}
            onChange={(value) => setInputValue(value)}
          />
        </Col>
        <BodyButtons 
          selectedValue={selectedValue}
          handleFormat={handleFormat}
          tabSpace={tabSpace}
          setTabSpace={setTabSpace}
        />
        <Col md={5}>
          <h5>Formatted {selectedValue.toUpperCase()}</h5>
          <CodeMirror
            value={formattedValue}
            height="500px"
            options={{ mode: selectedValue === "json" ? "application/json" : "application/xml", lineNumbers: true, readOnly: true }}
            theme={oneDark}
            editable={false}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;