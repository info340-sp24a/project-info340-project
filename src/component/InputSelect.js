export function SelectInput({ id, label, options, value, onChange }) {
    const optionElements = options.map(option => (
      <option key={option} value={option}>{option}</option>
    ));
  
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}:</label>
        <select id={id} className="form-select" value={value} onChange={onChange}>
          <option disabled value="">Select the company</option>
          {optionElements}
        </select>
      </div>
    );
  }