export function TextInput({ id, label, placeholder, type = "text", value, onChange }) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}:</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }