import NavDropdown from 'react-bootstrap/NavDropdown';

function JsonDropDown() {
  return (
    <div className="p-2 ms-auto">
      <NavDropdown title="Convert Json to" id="json-actions" className="bg-dropdown text-white p-2 rounded">
        <NavDropdown.Item href="#action1">Xml</NavDropdown.Item>
        <NavDropdown.Item href="#action2">Yaml</NavDropdown.Item>
        <NavDropdown.Item href="#action2">CSV</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default JsonDropDown;
