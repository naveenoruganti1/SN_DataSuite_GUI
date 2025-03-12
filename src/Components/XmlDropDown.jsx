function XmlDropDown() {
  return (
    <div>
      <select name="XML" id="xmldropdown">
        <option value="validator">Validator</option>
        <option value="wellFormedness">Well-formedness</option>
        <option value="conversions">Conversions</option>
      </select>
    </div>
  );
}

export default XmlDropDown;
