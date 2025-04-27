import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import yaml from 'js-yaml';

function App() {
  const [formattedValue, setFormattedValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // Either 'json' or 'xml'
  const [inputPayload, setInputPayload] = useState("");
  const [showTreeView, setShowTreeView] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [dropDownVal, setDropDownVal] = useState("json");
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    try {
      if (!inputPayload.trim()) {
        setFormattedValue("Error: Input cannot be empty");
        return { isValid: false, error: "Input cannot be empty" };
      }
      if (selectedValue === "json") {
        try {
          JSON.parse(inputPayload);
          setFormattedValue("Valid JSON!");
          return { isValid: true };
        } catch (error) {
          setFormattedValue(`Invalid JSON: ${error.message}`);
          return { isValid: false, error: `Invalid JSON: ${error.message}` };
        }
      } else if (selectedValue === "xml") {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(inputPayload, "application/xml");
        const errorNode = xmlDoc.getElementsByTagName("parsererror");

        if (errorNode.length) {
          setFormattedValue(`Error: ${errorNode[0].textContent}`);
          return { isValid: false, error: errorNode[0].textContent };
        }
        setFormattedValue("Valid XML!");
        return { isValid: true };
      } else if (selectedValue === "yaml") {
        try {
          yaml.load(inputPayload); // Attempt to parse YAML
          setFormattedValue("Valid YAML!");
          return { isValid: true };
        } catch (error) {
          const errorMessage = `Error: ${error.message}`;
          setFormattedValue(errorMessage);
          return { isValid: false, error: errorMessage };
        }
      }
    } catch (error) {
      setFormattedValue(`Invalid ${selectedValue.toUpperCase()}: ${error.message}`);
      return { isValid: false, error: `Invalid ${selectedValue.toUpperCase()}: ${error.message}` };
    }
  };
  
  return (
    <StrictMode>
      <Header setSelectedValue={setSelectedValue} validateInput={validateInput} 
              inputPayload={inputPayload} setFormattedValue={setFormattedValue}
              setDropDownVal={setDropDownVal} setLoading={setLoading}/>
      <Body validateInput={validateInput} setInputPayload={setInputPayload} 
            selectedValue={selectedValue} inputPayload={inputPayload}
            formattedValue={formattedValue} setFormattedValue={setFormattedValue}
            parsedData={parsedData} setParsedData={setParsedData}
            showTreeView={showTreeView} setShowTreeView={setShowTreeView}
            dropDownVal={dropDownVal} loading={loading}/>
      <Footer />
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
