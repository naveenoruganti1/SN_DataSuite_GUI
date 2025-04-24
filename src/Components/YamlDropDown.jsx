import { NavDropdown, Modal, Button } from "react-bootstrap"; 
import React, { useState, useEffect } from "react";
import { convertYamlToXml, convertYamlToJson } from "../apis/yamlConverters.js";
import vkbeautify from "vkbeautify";

const YamlDropDown = ({ 
    validateInput, 
    inputPayload, 
    setFormattedValue, 
    isYamlDisabled,
    setDropDownVal
  }) => {
        const [showModal, setShowModal] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");
        const [convertedData, setConvertedData] = useState("");
        const [selectedConversion, setSelectedConversion] = useState("");

  const handleValidation = async (eventKey) => {
    const result = validateInput();
    const isValid = result === null || result.isValid === undefined ? true : result.isValid; 

    if (!isValid) {
      setErrorMessage(result.error);
      setShowModal(true);
      return;
    }

    try {
      setDropDownVal(eventKey);
      if (eventKey === "xml") {
        const response = await convertYamlToXml(inputPayload);
        if (response.success) {
          setConvertedData(response.data);
          setSelectedConversion("xml");
        } else {
          setErrorMessage(`Error: ${response.error}`);
          setShowModal(true);
        }
      } else if (eventKey === "json") {
        const response = await convertYamlToJson(inputPayload);
        if (response.success) {
          setConvertedData(response.data);
          setSelectedConversion("json");
        } else {
          setErrorMessage(`Error: ${response.error}`);
          setShowModal(true);
        }
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (!convertedData || !selectedConversion) return;
    
    if (selectedConversion === "xml") {
      const formatted = vkbeautify.xml(convertedData, 2);
      setFormattedValue(formatted);
    } else if (selectedConversion === "json") {
      try {
        const formatted = vkbeautify.json(JSON.stringify(convertedData), 2);
        setFormattedValue(formatted);
      } catch (error) {
        console.error("Json Formatting Error:", error);
        setErrorMessage("Json Formatting Error.");
        setShowModal(true);
      }
    }
  }, [convertedData, selectedConversion, setFormattedValue]);

  return (
    <div className="p-2 ms-auto">
      <NavDropdown
        title="Convert Yaml to"
        id="yaml-actions"
        className="bg-dropdown text-white p-2 rounded"
        onSelect={(eventKey) => handleValidation(eventKey)}
        disabled={isYamlDisabled}>
        <NavDropdown.Item eventKey="json">Json</NavDropdown.Item>
        <NavDropdown.Item eventKey="xml">Xml</NavDropdown.Item>
      </NavDropdown>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Validation Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default YamlDropDown;
