import React, { useState } from "react";
import '../index.css';
import { getDatabase, ref, push } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { TextInput } from "./InputText";
import { NumInput } from "./InputNum";
import { SelectInput } from "./InputSelect";
import { StateSelector } from "./SelectState";

export function UploadForm({ currentUser }) {
  const [resortImage, setResortImage] = useState(null);
  const [resortName, setResortName] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [numLifts, setNumLifts] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [passCompany, setPassCompany] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!resortName || !resortImage || !state || !description || !numLifts || !ticketPrice || !passCompany) {
      setErrorMessage("Please fill out all required fields.");
      setSubmitStatus(null);
      return;
    }

    const storage = getStorage();
    const imageRef = storageRef(storage, `resortsImages/${resortName}.jpg`);

    try {
      await uploadBytes(imageRef, resortImage);
      const url = await getDownloadURL(imageRef);

      const formData = {
        resortName,
        resortImage: url,
        state,
        description,
        numLifts,
        ticketPrice,
        passCompany
      };

      const db = getDatabase();
      const resortRef = ref(db, `Resorts`);
      await push(resortRef, formData);
      console.log("Data submitted successfully");

      setResortImage(null);
      setResortName("");
      setState("");
      setDescription("");
      setNumLifts(0);
      setTicketPrice(0);
      setPassCompany("");
      setSubmitStatus("success");
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting data: ", error);
      setSubmitStatus("error");
      setErrorMessage("Error submitting data, please try again.");
    }
  };

  const handleImageChange = (event) => {
    setResortImage(event.target.files[0]);
  };

  const handleResortNameChange = (event) => {
    setResortName(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNumLiftsChange = (event) => {
    setNumLifts(Number(event.target.value));
  };

  const handleTicketPriceChange = (event) => {
    setTicketPrice(Number(event.target.value));
  };

  const handlePassCompanyChange = (event) => {
    setPassCompany(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-container">
      <section className="upload-container upload-container-wrapper">
        <div className="upload-form-content">
          <h2 className="m-5 text-center">Upload Your Ski Resort</h2>
          {submitStatus === "success" && (
            <div className="alert alert-success" role="alert">
              Data submitted successfully!
            </div>
          )}
          {submitStatus === "error" && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-warning" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="resort-image">Resort Image upload</label>
              <input
                id="resort-image"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                id="resort-name"
                label="Resort Name"
                placeholder="Enter the resort name"
                value={resortName}
                onChange={handleResortNameChange}
              />
              <div className="mb-3">
                <label htmlFor="state" className="upload-form-label">State:</label>
                <StateSelector id="state" value={state} onChange={handleStateChange} />
              </div>
              <TextInput
                id="description"
                label="Brief Description"
                placeholder="Enter a brief description"
                value={description}
                onChange={handleDescriptionChange}
              />
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
              <SelectInput
                id="pass-company"
                label="Pass Company"
                options={["IKON", "EPIC", "Other"]}
                value={passCompany}
                onChange={handlePassCompanyChange}
              />
            </div>
          </div>
          <div className="mt-4 d-grid gap-2 col-2 mx-auto">
            {currentUser ? (
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            ) : (
              <>
                <button type="submit" className="btn btn-danger" disabled>Submit</button>
                <div className="alert alert-warning mt-2" role="alert">
                  You need to sign in to submit data.
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </form>
  );
}