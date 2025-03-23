import React from 'react'
import { Button, Form, Col } from "react-bootstrap";

export default function BodyButtons({ selectedValue, handleFormat, tabSpace, setTabSpace, validateInput, minify }) {
    return (
        <Col md={2} className="d-flex flex-column align-items-center bg-success p-3">
            <Button onClick={handleFormat} className="mb-2">
                Format {selectedValue}
            </Button>
            <Form.Select
                value={tabSpace}
                onChange={(e) => setTabSpace(Number(e.target.value))}
            >
                <option value={2}>2 Tab Space</option>
                <option value={3}>3 Tab Space</option>
                <option value={4}>4 Tab Space</option>
            </Form.Select>
            <Button onClick={validateInput} className="mt-2">
                Validate {selectedValue}
            </Button>
            <Button onClick={minify} className="mt-2">
                Minify or Compact {selectedValue}
            </Button>
        </Col>
    )
}
