export function NumInput({ id, label, min, max, value, onChange }) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}: <span>{value}</span>
        </label>
        <input
          type="range"
          className="form-range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          id={id}
        />
      </div>
    );
  }