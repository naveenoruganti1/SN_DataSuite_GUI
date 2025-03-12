function JsonDropDown() {
  return (
    <div>
      <select name="JSON" id="jsondropdown">
        <option value="validator">Validator</option>
        <option value="wellFormedness">Well-formedness</option>
        <option value="conversions">Conversions</option>
      </select>
    </div>
  );
}

export default JsonDropDown;
