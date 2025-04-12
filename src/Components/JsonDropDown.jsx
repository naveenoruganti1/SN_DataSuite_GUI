import { NavDropdown, Modal, Button } from "react-bootstrap"; 
import React, { useState, useEffect } from "react";
import { convertJSONToXml, convertJSONToYaml, convertJSONToCSV } from "../apis/jsonConverters.js";
import vkbeautify from "vkbeautify";
import yaml from "js-yaml";

const JsonDropDown = ({ 
    validateInput, 
    inputPayload, 
    setFormattedValue, 
    isJsonDisabled
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
      if (eventKey === "xml") {
        const response = await convertJSONToXml(inputPayload);
        if (response.success) {
          setConvertedData(response.data);
          setSelectedConversion("xml");
        } else {
          setErrorMessage(`Error: ${response.error}`);
          setShowModal(true);
        }
      } else if (eventKey === "yaml") {
        const response = await convertJSONToYaml(inputPayload);
        if (response.success) {
          setConvertedData(response.data);
          setSelectedConversion("yaml");
        } else {
          setErrorMessage(`Error: ${response.error}`);
          setShowModal(true);
        }
      } else if (eventKey === "csv"){
        const response = await convertJSONToCSV(inputPayload);
        setConvertedData(response.data);
        setSelectedConversion("csv");
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
    } else if (selectedConversion === "yaml") {
      try {
        const parsedData = yaml.load(convertedData);
        const formatted = yaml.dump(parsedData, { indent: 2 });
        setFormattedValue(formatted);
      } catch (error) {
        console.error("YAML Formatting Error:", error);
        setErrorMessage("YAML Formatting Error.");
        setShowModal(true);
      }
    }else if (selectedConversion === "csv"){
        setFormattedValue(convertedData);
    }
  }, [convertedData, selectedConversion, setFormattedValue]);

  return (
    <div className="p-2 ms-auto">
      <NavDropdown
        title="Convert Json to"
        id="json-actions"
        className="bg-dropdown text-white p-2 rounded"
        onSelect={(eventKey) => handleValidation(eventKey)}
        disabled={isJsonDisabled}>
        <NavDropdown.Item eventKey="xml">Xml</NavDropdown.Item>
        <NavDropdown.Item eventKey="yaml">Yaml</NavDropdown.Item>
        <NavDropdown.Item eventKey="csv">CSV</NavDropdown.Item>
      </NavDropdown>

      {/* Bootstrap Modal for Error Message */}
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

export default JsonDropDown;
