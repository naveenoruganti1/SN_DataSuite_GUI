// Contact.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { sendEmail } from "../apis/jsonConverters.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    return (
      formData.name.trim() !== '' &&
      validateEmail(formData.email) &&
      formData.subject.trim() !== '' &&
      formData.message.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      // Replace with your actual API endpoint
      const response = await sendEmail(JSON.stringify(formData));
      console.log(response);
      if (!response.success || (null!=response.data && !response.data.success)) {
        throw new Error('Getting issue while sending email..');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false
      });
    } catch (error) {
      setStatus({ submitting: false, success: false, error: error.message });
    }
  };

  return (
    <Container className="my-2" style={{ maxWidth: '1000px' }}>
      <h1 className="mb-4">Contact Us</h1>
      
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            {status.success && (
              <Alert variant="success" className="mb-4">
                Thank you for your message! We'll get back to you soon.
              </Alert>
            )}
            {status.error && (
              <Alert variant="danger" className="mb-4">
                Error: {status.error}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={touched.name && formData.name.trim() === ''}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={touched.email && !validateEmail(formData.email)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Enter Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                isInvalid={touched.subject && formData.subject.trim() === ''}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a subject
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={touched.message && formData.message.trim() === ''}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your message
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2"
              disabled={!validateForm() || status.submitting}
            >
              {status.submitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                </>
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;