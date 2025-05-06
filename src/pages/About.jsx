// About.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <h1 className="mb-4">About SN Data Suite</h1>
      
      <section className="mb-4">
        <h2>Our Mission</h2>
        <p>
          SN Data Suite was created to simplify working with JSON, XML, and YAML data formats. 
          Our mission is to provide developers with fast, reliable, and secure tools for formatting, 
          validating, and converting between these popular data interchange formats.
        </p>
      </section>

      <section className="mb-4">
        <h2>Features</h2>
        <ul>
          <li><strong>Smart Formatting:</strong> Beautify and minify JSON/XML/YAML with one click</li>
          <li><strong>Validation:</strong> Instant syntax checking and error highlighting</li>
          <li><strong>Conversion:</strong> Convert between JSON, XML, and YAML formats</li>
          <li><strong>Tree View:</strong> Visualize hierarchical data structures</li>
          <li><strong>Secure:</strong> All processing happens in your browser - your data never leaves your device</li>
          <li><strong>Free:</strong> 100% free with no hidden costs or limitations</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2>For Developers, By Developers</h2>
        <p>
          As developers ourselves, we understand the frustration of working with malformed JSON or 
          struggling with configuration files. SN Data Suite was born out of our own need for 
          a simple, no-nonsense tool that just works.
        </p>
        <p>
          We're committed to keeping this tool free, open, and accessible to all developers, 
          students, and tech enthusiasts.
        </p>
      </section>

      <section className="mb-4">
        <h2>Technology Stack</h2>
        <p>
          SN Data Suite is built with modern web technologies:
        </p>
        <ul>
          <li>React.js for the frontend interface</li>
          <li>Bootstrap for responsive design</li>
          <li>React Router for navigation</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2>Open Source</h2>
        <p>
          We believe in open source and community contributions. The core formatting libraries 
          we use are open source, and we're committed to giving back to the community.
        </p>
      </section>

      <section className="mb-4">
        <h2>Contact Us</h2>
        <p>
          Have suggestions or found a bug? We'd love to hear from you!
        </p>
        <p>
          Reach us through our <a href="/contact">Contact Page</a> or email us at 
          <a href="mailto:support@sndatasuite.com"> support@sndatasuite.com</a>.
        </p>
      </section>

      <section className="mb-4">
        <h2>Special Thanks</h2>
        <p>
          We want to thank the open source community and all the developers who have contributed 
          to the libraries that make this tool possible.
        </p>
      </section>
    </Container>
  );
};

export default About;