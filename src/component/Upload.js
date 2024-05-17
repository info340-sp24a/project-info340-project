import React, { useState } from "react"
import '../index.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function StateSelector(props) {
    const states = [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    const stateArray = states.map((state) => {
        const transformed = (
            <option key={state} value={state}>{state}</option>
        )
        return transformed
    })
  
    return (
      <select className="form-select" defaultValue='Select the state'>
        <option key='default' value='Enter a state'>Enter a state</option>
        {stateArray}
      </select>
    );
  }



  function TextInput({ id, label, placeholder, type = "text"}) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}:</label>
        <input type={type} id={id} placeholder={placeholder} className="form-control" />
      </div>
    );
  }

  function NumInput({ id, label, min, max, value, onChange}) {
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
  
  function SelectInput({ id, label, options }) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}:</label>
        <select id={id} className="form-select">
          <option disabled value="">Select the company</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
  
  export function UploadForm() {
    const [numLifts, setNumLifts] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        // collect data
        console.log("Form submitted");
    };

    const handleNumLiftsChange = (event) => {
        setNumLifts(event.target.value);
    };
    
      const handleTicketPriceChange = (event) => {
        setTicketPrice(event.target.value);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <section className="container form-content">
          <div className="row mb-4">
            <div className="col-md-6">
              <TextInput id="resort-image" label="Resort Image upload" type="file" />
            </div>
  
            <div className="col-md-6">
              <TextInput id="resort-name" label="Resort Name" placeholder="Enter the resort name" />
              <div className="mb-3">
                <label htmlFor="state" className="form-label">State:</label>
                <StateSelector />
              </div>
              <TextInput id="description" label="Brief Description" placeholder="Enter a brief description" />
              <NumInput
              id="num-lifts"
              label="Number of Lifts"
              min="0"
              max="50"
              value={numLifts}
              onChange={handleNumLiftsChange}
            />
            <NumInput
              id="ticket-price"
              label="Ticket Price"
              min="0"
              max="1000"
              value={ticketPrice}
              onChange={handleTicketPriceChange}
            />
              <SelectInput id="pass-company" label="Pass Company" options={["IKON", "EPIC", "Other"]} defaultValue="" />
            </div>
          </div>
          <div className="mt-4 d-grid gap-2 col-2 mx-auto">
            <button type="submit" className="btn btn-outline-primary">Submit</button>
          </div>
        </section>
      </form>
    );
  }