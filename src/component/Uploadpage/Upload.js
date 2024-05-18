import React, { useState } from "react";
import '../../index.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { StateSelector } from "./SelectState";
import { TextInput } from "./InputText";
import { NumInput } from "./InputNum";
import { SelectInput } from "./InputSelect";

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
              onChange={(event) => setResortImage(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <TextInput
              id="resort-name"
              label="Resort Name"
              placeholder="Enter the resort name"
              value={resortName}
              onChange={(event) => setResortName(event.target.value)}
            />
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State:</label>
              <StateSelector value={state} onChange={(event) => setState(event.target.value)} />
            </div>
            <TextInput
              id="description"
              label="Brief Description"
              placeholder="Enter a brief description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <NumInput
              id="num-lifts"
              label="Number of Lifts"
              min="0"
              max="50"
              value={numLifts}
              onChange={(event) => setNumLifts(event.target.value)}
            />
            <NumInput
              id="ticket-price"
              label="Ticket Price"
              min="0"
              max="1000"
              value={ticketPrice}
              onChange={(event) => setTicketPrice(event.target.value)}
            />
            <SelectInput
              id="pass-company"
              label="Pass Company"
              options={["IKON", "EPIC", "Other"]}
              value={passCompany}
              onChange={(event) => setPassCompany(event.target.value)}
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