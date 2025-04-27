import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPaste, faFileLines, faDownload, faUndo, faRedo, faCog, faTimesCircle, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import vkbeautify from "vkbeautify";
import { EditorView } from "@codemirror/view";
import { EditorState, Annotation } from "@codemirror/state";
import { history, undo, redo } from "@codemirror/commands";
import BodyButtons from "./BodyButtons.jsx";
import { xml } from "@codemirror/lang-xml";
import { json } from "@codemirror/lang-json";
import { yaml as yamlMode } from "@codemirror/legacy-modes/mode/yaml";
import { StreamLanguage } from "@codemirror/language";
import ReactJson from "react-json-view";
import "../reactJsonTheme.css";
import * as yamlV from 'yaml';

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
  setShowTreeView,
  dropDownVal,
  loading
}) => {
  const [tabSpace, setTabSpace] = useState(2);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, ch: 1 });
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [wrapLines, setWrapLines] = useState(false);
  const inputAnnotation = Annotation.define();
  const editorViewRef = useRef(null);

  useEffect(() => {
    setInputPayload("");
    setFormattedValue("");
    setParsedData(null);
    setShowTreeView(false);
    setCanUndo(false);
    setCanRedo(false);
  }, [selectedValue]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputPayload);
  };

  const handleCopyRight = () => {
    navigator.clipboard.writeText(formattedValue);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setInputPayload(text);
  };

  const handleLoadSample = () => {
    if (selectedValue === "json") {
      const sampleJson = {
        employees: {
          employee: [
            {
              id: "1",
              firstName: "Tom",
              lastName: "Cruise",
              photo: "https://jsonformatter.org/img/tom-cruise.jpg"
            },
            {
              id: "2",
              firstName: "Maria",
              lastName: "Sharapova",
              photo: "https://jsonformatter.org/img/Maria-Sharapova.jpg"
            },
            {
              id: "3",
              firstName: "Robert",
              lastName: "Downey Jr.",
              photo: "https://jsonformatter.org/img/Robert-Downey-Jr.jpg"
            }
          ]
        }
      };

      const formattedSample = JSON.stringify(sampleJson, null, tabSpace);
      setInputPayload(formattedSample);
      setFormattedValue(formattedSample);
      setParsedData(null);
      setShowTreeView(false);
    }else if(selectedValue === "xml"){
      const samplexml = `
      <employees>
        <employee>
          <id>1</id>
          <firstName>Tom</firstName>
          <lastName>Cruise</lastName>
          <photo>https://jsonformatter.org/img/tom-cruise.jpg</photo>
        </employee>
        <employee>
          <id>2</id>
          <firstName>Maria</firstName>
          <lastName>Sharapova</lastName>
          <photo>https://jsonformatter.org/img/Maria-Sharapova.jpg</photo>
        </employee>
        <employee>
          <id>3</id>
          <firstName>Robert</firstName>
          <lastName>Downey Jr.</lastName>
          <photo>https://jsonformatter.org/img/Robert-Downey-Jr.jpg</photo>
        </employee>
      </employees>`;
      const formattedSample = vkbeautify.xml(samplexml, tabSpace);
      setInputPayload(formattedSample);
      setFormattedValue(formattedSample);
      setParsedData(null);
      setShowTreeView(false);
    }else if (selectedValue === "yaml"){
      const sampleYaml = 
`employees:
  - id: 1
    firstName: Tom
    lastName: Cruise
    photo: https://jsonformatter.org/img/tom-cruise.jpg
  - id: 2
    firstName: Maria
    lastName: Sharapova
    photo: https://jsonformatter.org/img/Maria-Sharapova.jpg
  - id: 3
    firstName: Robert
    lastName: Downey Jr.
    photo: https://jsonformatter.org/img/Robert-Downey-Jr.jpg`;

      const formattedSample = vkbeautify.yaml ? vkbeautify.yaml(sampleYaml, tabSpace) : sampleYaml;
      setInputPayload(formattedSample);
      setFormattedValue(formattedSample);
      setParsedData(null);
      setShowTreeView(false);

    }
  };

  const handleDownload = () => {
    if (formattedValue === "") {
      alert("No formatted output to download.");
      return;
    }
    const blob = new Blob([formattedValue], { type: "text/plain;charset=utf-8" });
    const fileType = dropDownVal;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `formatted-output.${fileType}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleUndo = () => {
    if (editorViewRef.current) {
      undo(editorViewRef.current);
    }
  };

  const handleRedo = () => {
    if (editorViewRef.current) {
      redo(editorViewRef.current);
    }
  };

  const handleAutoCorrectJson = () => {
    try {
      const currentPayload = editorViewRef.current?.state.doc.toString() || '';
      let lastError = null;
      let correctedJson = currentPayload;
  
      // Attempt 1: Direct parse
      try {
        const parsedJson = JSON.parse(correctedJson);
        const formattedJson = JSON.stringify(parsedJson, null, tabSpace);
        setInputPayload(formattedJson);
        setFormattedValue(formattedJson);
        return;
      } catch (error) {
        const pos = parseInt(error[1]);
        const errorContext = correctedJson.substring(Math.max(0, pos - 20), pos + 20);
        setFormattedValue(`JSON Error (near position ${pos}):\n\n...${errorContext}...\n\n${error.message}`);
      }
  
      // Attempt 2: Basic corrections
      correctedJson = correctedJson
        .replace(/(["\w]\s*}\s*)(["\w])/g, '$1,$2')
        .replace(/(["\w]\s*]\s*)(["\w])/g, '$1,$2')
        .replace(/([^,{])\n\s*"/g, '$1,\n"');
  
      try {
        const parsedJson = JSON.parse(correctedJson);
        const formattedJson = JSON.stringify(parsedJson, null, tabSpace);
        setInputPayload(formattedJson);
        setFormattedValue(formattedJson);
        return;
      } catch (error) {
        const pos = parseInt(error[1]);
        const errorContext = correctedJson.substring(Math.max(0, pos - 20), pos + 20);
        setFormattedValue(`JSON Error (near position ${pos}):\n\n...${errorContext}...\n\n${error.message}`);
      }
  
      // Attempt 3: More aggressive fixes
      correctedJson = correctedJson
        .replace(/(\s*"[^"]+"\s*:\s*(?:"[^"]*"|\d+|true|false|null)\s*)(?=[^,}\]])/g, '$1,')
        .replace(/,\s*([}\]])/g, '$1');
  
      try {
        const parsedJson = JSON.parse(correctedJson);
        const formattedJson = JSON.stringify(parsedJson, null, tabSpace);
        setInputPayload(formattedJson);
        setFormattedValue(formattedJson);
      } catch (finalError) {
        // Always use the latest error
        const errorPosition = finalError.message.match(/position (\d+)/);
        
        if (errorPosition) {
          const pos = parseInt(errorPosition[1]);
          const errorContext = correctedJson.substring(Math.max(0, pos - 20), pos + 20);
          setFormattedValue(`JSON Error (near position ${pos}):\n\n...${errorContext}...\n\n${finalError.message}`);
        } else {
          setFormattedValue(`JSON Error:\n${finalError.message}`);
        }
      }
    } catch (error) {
      console.error("Auto-correction failed:", error);
      setFormattedValue("Failed to auto-correct JSON. Please check the syntax manually.");
    }
  };
      
  const handleAutoCorrectYaml = () => {
    try {
      let correctedYaml = inputPayload;
  
      // 1. Standardize list item syntax (-id: → - id:)
      correctedYaml = correctedYaml.replace(/^(\s*)-(\S)/gm, '$1- $2');
  
      // 2. Prepare for indentation correction
      const lines = correctedYaml.split('\n');
      let inList = false;
      let currentIndent = 0;
  
      const correctedLines = lines.map((line) => {
        const trimmed = line.trim();
  
        if (!trimmed) return line; // Preserve blank lines
  
        const leadingSpaces = line.match(/^\s*/)?.[0].length ?? 0;
  
        // Detect list item
        if (trimmed.startsWith('-')) {
          inList = true;
          currentIndent = leadingSpaces;
          return `${' '.repeat(currentIndent)}${trimmed}`;
        }
  
        // If inside a list, indent properties properly
        if (inList && trimmed.includes(':')) {
          return `${' '.repeat(currentIndent + 2)}${trimmed}`;
        }
  
        return line;
      });
  
      correctedYaml = correctedLines.join('\n');
  
      // 3. Try parsing YAML
      const parsed = yamlV.parse(correctedYaml);
  
      // 4. Reformat it nicely
      const formatted = yamlV.stringify(parsed, { indent: 2 });
  
      // 5. Update the state
      setInputPayload(formatted);
      setFormattedValue(formatted);
      setParsedData(parsed);
    } catch (error) {
      setFormattedValue(`YAML Error:\n${error.message}`);
    }
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
      } else if (selectedValue === "xml") {
        const formatted = vkbeautify.xml(inputPayload, tabSpace);
        setFormattedValue(formatted);
      } else if (selectedValue === "yaml") {
        const parsedData = yamlV.parse(inputPayload);
        const formatted = yamlV.stringify(parsedData, { indent: tabSpace });
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
      } else if (selectedValue === "yaml") {
        const parsed = yamlV.parse(inputPayload);

        const compact = JSON.stringify(parsed)
          .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys (optional)
          .replace(/:"([^"]+)"/g, ':$1') // remove quotes from values (optional)
          .replace(/\\\//g, '/')  // unescape slashes (optional)
          .replace(/"/g, "'");  // replace double quotes with single quotes (optional)
      
        setFormattedValue(compact);
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
    padding: "10px",
    fontSize: "1.1rem"
  };

  const ribbonStyleFullWidth = {
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    boxShadow: "inset 0 -1px 0 rgba(70, 64, 64, 0.1)"
  };

  const editorContainerStyle = {
    border: "1px solid #e0e0e0",
    borderTop: "none",
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    overflow: "hidden"
  };

  const IconWithTooltip = ({ icon, tooltipText, onClick, disabled }) => (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{tooltipText}</Tooltip>}
    >
      <span>
        <FontAwesomeIcon
          icon={icon}
          onClick={onClick}
          style={{ ...iconStyle, opacity: disabled ? 0.5 : 1 }}
          disabled={disabled}
        />
      </span>
    </OverlayTrigger>
  );

  return (
    <Container fluid>
      <Row>
        <Col md={5}>
          <h5>Input {selectedValue.toUpperCase()}</h5>
          <div style={ribbonStyleFullWidth}>
            <IconWithTooltip icon={faCopy} tooltipText="Copy Input" onClick={handleCopy} />
            <IconWithTooltip icon={faPaste} tooltipText="Paste from Clipboard" onClick={handlePaste} />
            <IconWithTooltip icon={faFileLines} tooltipText="Load Sample Data" onClick={handleLoadSample} />
            {(selectedValue === "json" || selectedValue === "yaml") && (
                <IconWithTooltip
                  icon={faCog}
                  tooltipText={
                    selectedValue === "json"
                      ? "Fix minor errors like trailing commas, indentations etc."
                      : "Attempt to fix indentation or structure issues in YAML"
                  }
                  onClick={() => {
                    if (selectedValue === "json") {
                      handleAutoCorrectJson();
                    } else if (selectedValue === "yaml") {
                      handleAutoCorrectYaml();
                    }
                  }}
                />
            )}
            <IconWithTooltip
              icon={faUndo}
              tooltipText="Undo"
              onClick={handleUndo}
            />
            <IconWithTooltip
              icon={faRedo}
              tooltipText="Redo"
              onClick={handleRedo}
            />
            <IconWithTooltip
              icon={faTimesCircle}
              tooltipText="Clear"
              onClick={() => {
                setInputPayload('');
                setFormattedValue('');
                setParsedData(null);
                setShowTreeView(false);
              }}
            />
          </div>
          <div style={editorContainerStyle}>
            <CodeMirror
              value={inputPayload}
              height="500px"
              extensions={[ 
                selectedValue === "json"
                  ? json()
                  : selectedValue === "yaml"
                  ? StreamLanguage.define(yamlMode)
                  : xml(),
                history(),
                EditorView.theme({
                  "&": { cursor: "text" },
                  ".cm-cursor": { borderLeftColor: "#000 !important" },
                }),
                EditorState.transactionExtender.of(tr => {
                  if (!tr.isUserEvent("undo") && !tr.isUserEvent("redo")) {
                    return { annotations: [inputAnnotation.of("input")] };
                  }
                  return null;
                })
              ]}
              theme={eclipse}
              onChange={(value, viewUpdate) => {
                setInputPayload(value);
                handleCursorChange(viewUpdate.view);
              }}
              onCreateEditor={(view) => {
                editorViewRef.current = view;
              }}              
            />
          </div>
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
          <div style={ribbonStyleFullWidth}>
            <IconWithTooltip icon={faCopy} tooltipText="Copy Formatted Output" onClick={handleCopyRight} />
            <IconWithTooltip icon={faDownload} tooltipText="Download Formatted Output" onClick={handleDownload} />
            <IconWithTooltip
              icon={faAlignLeft}
              tooltipText="Toggle Word Wrap"
              onClick={() => setWrapLines(prev => !prev)}
            />
          </div>

          <div style={editorContainerStyle}>
            {showTreeView && parsedData ? (
              <ReactJson
                className="react-json-view"
                src={parsedData}
                collapsed={2}
                displayDataTypes={false}
                name={false}
              />
            ) : (
              <div style={{ position: "relative", minHeight: "500px" }}>
              <CodeMirror
                value={formattedValue}
                height="500px"
                extensions={[ 
                  selectedValue === "json"
                    ? json()
                    : selectedValue === "yaml"
                    ? StreamLanguage.define(yamlMode)
                    : xml(),
                  EditorView.theme({
                    "&": { cursor: "text" },
                    ".cm-cursor": { borderLeftColor: "#000 !important" },
                  }),
                  wrapLines ? EditorView.lineWrapping : []
                ]}
                theme={eclipse}
                editable={false}
              />
              {loading && (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.6)", 
        zIndex: 10
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )}
</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
