import NavDropdown from 'react-bootstrap/NavDropdown';

function XmlDropDown() {
  return (
    <div className="p-2">
      <NavDropdown title="Convert Xml to" id="xml-actions" className="bg-dropdown text-white p-2 rounded">
        <NavDropdown.Item href="#action3">Json</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Yaml</NavDropdown.Item>
        <NavDropdown.Item href="#action4">CSV</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default XmlDropDown;
