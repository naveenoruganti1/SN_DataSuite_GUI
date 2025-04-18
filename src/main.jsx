import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";

function App() {
  const [formattedValue, setFormattedValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // Either 'json' or 'xml'
  const [inputPayload, setInputPayload] = useState("");
  const [showTreeView, setShowTreeView] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [jsonDropDownVal, setJsonDropDownVal] = useState("json");

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
      }
    } catch (error) {
      setFormattedValue(`Invalid ${selectedValue.toUpperCase()}: ${error.message}`);
      return { isValid: false, error: `Invalid ${selectedValue.toUpperCase()}: ${error.message}` };
    }
  };
  /*const handleJsonConvertionFormat = () => {
        const { isValid, error } = validateInput();
    
        if (!isValid) {
          setFormattedValue(`Error: ${error}`);
          return;
        }
        try {
          if (selectedValue === "json" && selectedConversion === "json") {
            const parsedJson = JSON.parse(inputPayload);
            const formatted = vkbeautify.json(JSON.stringify(parsedJson), tabSpace);
            setFormattedValue(formatted);
          } else if (selectedValue === "json" && selectedConversion === "xml") {
            const formatted = vkbeautify.xml(inputPayload, tabSpace);
            setFormattedValue(formatted);
          }
        } catch (error) {
          setFormattedValue(
            `Invalid ${selectedValue.toUpperCase()}! Please check your input.`
          );
        }
      };*/

  return (
    <StrictMode>
      <Header setSelectedValue={setSelectedValue} validateInput={validateInput} 
              inputPayload={inputPayload} setFormattedValue={setFormattedValue}
              setJsonDropDownVal={setJsonDropDownVal}/>
      <Body validateInput={validateInput} setInputPayload={setInputPayload} 
            selectedValue={selectedValue} inputPayload={inputPayload}
            formattedValue={formattedValue} setFormattedValue={setFormattedValue}
            parsedData={parsedData} setParsedData={setParsedData}
            showTreeView={showTreeView} setShowTreeView={setShowTreeView}
            jsonDropDownVal={jsonDropDownVal}/>
      <Footer />
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
