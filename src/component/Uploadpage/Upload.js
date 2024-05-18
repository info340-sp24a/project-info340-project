import React, { useState } from "react";
import '../../index.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function StateSelector({ value, onChange }) {
  const StateOptions = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin",
    "Wyoming"
  ];

  return (
    <select className="form-select" value={value} onChange={onChange}>
      <option disabled value="">Select the state</option>
      {StateOptions.map((state) => (
        <option key={state} value={state}>{state}</option>
      ))}
    </select>
  );
}

function TextInput({ id, label, placeholder, type = "text", value, onChange }) {
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

function NumInput({ id, label, min, max, value, onChange }) {
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
function SelectInput({ id, label, options, value, onChange }) {
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
  
export function UploadForm() {
  const [resortImage, setResortImage] = useState("");
  const [resortName, setResortName] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [numLifts, setNumLifts] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [passCompany, setPassCompany] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      resortImage,
      resortName,
      state,
      description,
      numLifts,
      ticketPrice,
      passCompany
    };
    console.log("Form submitted:", formData);
    // still need to work on submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="container form-content">
        <div className="row mb-4">
          <div className="col-md-6">
            <TextInput
              id="resort-image"
              label="Resort Image upload"
              type="file"
              value={resortImage}
              onChange={(e) => setResortImage(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <TextInput
              id="resort-name"
              label="Resort Name"
              placeholder="Enter the resort name"
              value={resortName}
              onChange={(e) => setResortName(e.target.value)}
            />
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State:</label>
              <StateSelector value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <TextInput
              id="description"
              label="Brief Description"
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <NumInput
              id="num-lifts"
              label="Number of Lifts"
              min="0"
              max="50"
              value={numLifts}
              onChange={(e) => setNumLifts(e.target.value)}
            />
            <NumInput
              id="ticket-price"
              label="Ticket Price"
              min="0"
              max="1000"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
            />
            <SelectInput
              id="pass-company"
              label="Pass Company"
              options={["IKON", "EPIC", "Other"]}
              value={passCompany}
              onChange={(e) => setPassCompany(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 d-grid gap-2 col-2 mx-auto">
          <button type="submit" className="btn btn-outline-primary">Submit</button>
        </div>
      </section>
    </form>
  );
}