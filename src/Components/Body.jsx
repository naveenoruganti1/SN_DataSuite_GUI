import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPaste } from '@fortawesome/free-solid-svg-icons';
import vkbeautify from "vkbeautify";
import  BodyButtons from "./BodyButtons.jsx";

const Body = ({ selectedValue }) => {
  const [tabSpace, setTabSpace] = useState(2);
  const [inputPayload, setInputPayload] = useState('');
  const [formattedValue, setFormattedValue] = useState("");

  // Copy text function
  const handleCopy = () => {
    navigator.clipboard.writeText(inputPayload).then(() => alert("Text copied!"));
  };

  // Paste text function
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setInputPayload(text);
  };

  useEffect(() => {//Clearing the values when the selected value changes
    setInputPayload("");
    setFormattedValue("");
  }, [selectedValue]);

  const handleFormat = () => {
    const { isValid, error } = validateInput();

    if (!isValid) {
      setFormattedValue(`Error: ${error}`);
      return;
    }
    try {
      if (selectedValue === "json") {
        const parsedJson = JSON.parse(inputPayload);
        const formatted = vkbeautify.json(JSON.stringify(parsedJson), tabSpace);
        setFormattedValue(formatted);
      } else if (selectedValue === "xml") {
        const formatted = vkbeautify.xml(inputPayload, tabSpace);
        setFormattedValue(formatted);
      }
    } catch (error) {
      setFormattedValue(`Invalid ${selectedValue.toUpperCase()}! Please check your input.`);
    }
  };
  const validateInput = () => {
    try {
      if (selectedValue === "json") {
        JSON.parse(inputPayload); // Just checking if it's valid JSON
        setFormattedValue(`Valid Json!`);
        return { isValid: true };
      } else if (selectedValue === "xml") {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(inputPayload, "application/xml");
        const errorNode = xmlDoc.getElementsByTagName("parsererror");
  
        if (errorNode.length) {
          setFormattedValue(`Error: ${errorNode[0].textContent}`);
          return { isValid: false, error: errorNode[0].textContent };
        }
        setFormattedValue(`Valid Xml!`);
        return { isValid: true };
      }
    } catch (error) {
      if (selectedValue === "json") {
        const match = error.message.match(/position (\d+)/);
        if (match) {
          const position = parseInt(match[1], 10);
          const lineNumber = inputPayload.substring(0, position).split("\n").length;
          setFormattedValue(`Error at line ${lineNumber}: ${error.message}`);
          return { isValid: false, error: `Error at line ${lineNumber}: ${error.message}` };
        }
      }
      setFormattedValue(`Invalid ${selectedValue.toUpperCase()}: ${error.message}`);
      return { isValid: false, error: `Invalid ${selectedValue.toUpperCase()}: ${error.message}` };
    }
  };
  const minify = () => {
    const { isValid, error } = validateInput();

    if (!isValid) {
      setFormattedValue(`Error: ${error}`);
      return;
    }
    try {
      if (selectedValue === "json") {
        const parsedJson = JSON.parse(inputPayload);
        var json_min = vkbeautify.jsonmin(JSON.stringify(parsedJson));
        setFormattedValue(json_min);
      } else if (selectedValue === "xml") {
        const xml_min = vkbeautify.xmlmin(inputPayload, [true]);
        setFormattedValue(xml_min);
      }
    } catch (error) {
      setFormattedValue(`Invalid ${selectedValue.toUpperCase()}! Please check your input.`);
    }
  };
  const iconStyle = {
    cursor: "pointer",
    transition: "color 0.3s ease",
    padding: "5px",
  };
  return (
    <Container fluid>
      <Row>
        <Col md={5}>
          <h5>Input {selectedValue.toUpperCase()}</h5>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}>
            <FontAwesomeIcon icon={faCopy} onClick={handleCopy} style={iconStyle}  />
            <FontAwesomeIcon icon={faPaste} onClick={handlePaste} style={iconStyle} />
          </div>
          <CodeMirror
            value={inputPayload}
            height="500px"
            options={{ mode: selectedValue === "json" ? "application/json" : "application/xml", lineNumbers: true }}
            theme={oneDark}
            onChange={(value) => setInputPayload(value)}
          />
        </Col>
        <BodyButtons 
          selectedValue={selectedValue}
          handleFormat={handleFormat}
          tabSpace={tabSpace}
          setTabSpace={setTabSpace}
          validateInput={validateInput}
          minify = {minify}
        />
        <Col md={5}>
          <h5>Formatted {selectedValue.toUpperCase()}</h5>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}>
            <FontAwesomeIcon icon={faCopy} onClick={handleCopy} style={iconStyle}  />
          </div>
          <CodeMirror
            value={formattedValue}
            height="500px"
            options={{ mode: selectedValue === "json" ? "application/json" : "application/xml", lineNumbers: true}}
            theme={oneDark}
            editable={false}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;