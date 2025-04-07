import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPaste } from "@fortawesome/free-solid-svg-icons";
import vkbeautify from "vkbeautify";
import { EditorView } from "@codemirror/view";
import BodyButtons from "./BodyButtons.jsx";
import { xml } from "@codemirror/lang-xml";
import { json } from "@codemirror/lang-json";
import ReactJson from "react-json-view";
import "../reactJsonTheme.css"; // Import the CSS file for ReactJson

const Body = ({
  validateInput,
  setInputPayload,
  selectedValue,
  inputPayload,
  formattedValue,
  setFormattedValue,
  parsedData,
  setParsedData,
  showTreeView,
  setShowTreeView
}) => {
  const [tabSpace, setTabSpace] = useState(2);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, ch: 1 });

  useEffect(() => {
    setInputPayload("");
    setFormattedValue("");
    setParsedData(null);
    setShowTreeView(false);
  }, [selectedValue]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputPayload).then(() => alert("Text copied!"));
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setInputPayload(text);
  };

  const handleCursorChange = (view) => {
    const cursor = view.state.selection.main.head;
    const line = view.state.doc.lineAt(cursor);
    setCursorPosition({ line: line.number, ch: cursor - line.from + 1 });
  };

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
        setParsedData(parsedJson);
        // setShowTreeView(false);
      } else if (selectedValue === "xml") {
        const formatted = vkbeautify.xml(inputPayload, tabSpace);
        setFormattedValue(formatted);
        
      }
    } catch (error) {
      setFormattedValue(
        `Invalid ${selectedValue.toUpperCase()}! Please check your input.`
      );
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
        const jsonMin = vkbeautify.jsonmin(JSON.stringify(parsedJson));
        setFormattedValue(jsonMin);
      } else if (selectedValue === "xml") {
        const xmlMin = vkbeautify.xmlmin(inputPayload, [true]);
        setFormattedValue(xmlMin);
      }
    } catch (error) {
      setFormattedValue(
        `Invalid ${selectedValue.toUpperCase()}! Please check your input.`
      );
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faCopy} onClick={handleCopy} style={iconStyle} />
            <FontAwesomeIcon icon={faPaste} onClick={handlePaste} style={iconStyle} />
          </div>
          <CodeMirror
            value={inputPayload}
            height="500px"
            extensions={[
              selectedValue === "json" ? json() : xml(),
              EditorView.theme({
                "&": { cursor: "text" },
                ".cm-cursor": { borderLeftColor: "#000 !important" },
              }),
            ]}
            theme={eclipse}
            onChange={(value, viewUpdate) => {
              setInputPayload(value);
              handleCursorChange(viewUpdate.view);
            }}
          />
          <div className="text-muted mt-1">
            Line: {cursorPosition.line}, Col: {cursorPosition.ch}
          </div>
        </Col>

        <BodyButtons
          selectedValue={selectedValue}
          handleFormat={handleFormat}
          tabSpace={tabSpace}
          setTabSpace={setTabSpace}
          validateInput={validateInput}
          minify={minify}
          onToggleTree={() => setShowTreeView((prev) => !prev)}
          showTree={showTreeView}
        />

        <Col md={5}>
          <h5>Formatted {selectedValue.toUpperCase()}</h5>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faCopy} onClick={handleCopy} style={iconStyle} />
          </div>

          <div style={{ marginTop: "20px" }}>
            {showTreeView && parsedData? (
              <ReactJson
                className="react-json-view"
                src={parsedData}
                collapsed={2}
                displayDataTypes={false}
                name={false}
              />
            ) : (
              <CodeMirror
                value={formattedValue}
                height="500px"
                extensions={[
                  selectedValue === "json" ? json() : xml(),
                  EditorView.theme({
                    "&": { cursor: "text" },
                    ".cm-cursor": { borderLeftColor: "#000 !important" },
                  }),
                ]}
                theme={eclipse}
                editable={false}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
