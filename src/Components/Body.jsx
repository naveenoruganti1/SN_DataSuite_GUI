import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import { oneDark } from "@codemirror/theme-one-dark";

const Body = () => {
  const [xmlInput, setXmlInput] = useState("");
  const [formattedXml, setFormattedXml] = useState("");
  const [tabSpace, setTabSpace] = useState(2);

  const formatXml = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, "application/xml");
      const serializer = new XMLSerializer();
      let formatted = serializer.serializeToString(xmlDoc);
      console.log(formatted);
      formatted = formatted.replace(/></g, `>\n${" ".repeat(tabSpace)}`);
      setFormattedXml(formatted);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={5}>
          <h5>Input XML</h5>
          <CodeMirror
            value={xmlInput}
            height="500px"
            extensions={[xml()]}
            theme={oneDark}
            onChange={(value) => setXmlInput(value)}
          />
        </Col>
        <Col
          md={2}
          className="d-flex flex-column align-items-center bg-success p-3"
        >
          <Button onClick={formatXml} className="mb-2">
            Format / Beautify
          </Button>
          <Form.Select
            value={tabSpace}
            onChange={(e) => setTabSpace(Number(e.target.value))}
          >
            <option value={2}>2 Tab Space</option>
            <option value={4}>4 Tab Space</option>
          </Form.Select>
        </Col>
        <Col md={5}>
          <h5>Formatted XML</h5>
          <CodeMirror
            value={formattedXml}
            height="500px"
            extensions={[xml()]}
            theme={oneDark}
            editable={false}
            onChange={(value) => setXmlInput(value)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
