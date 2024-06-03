import React, { useState } from "react";
import '../index.css';
import { getDatabase, ref, push} from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { StateSelector } from "./SelectState";
import { TextInput } from "./InputText";
import { NumInput } from "./InputNum";
import { SelectInput } from "./InputSelect";

export function UploadForm({ currentUser }) {
  const [resortImage, setResortImage] = useState(null);
  const [resortName, setResortName] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [numLifts, setNumLifts] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [passCompany, setPassCompany] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storage = getStorage();
    const imageRef = storageRef(storage, `resortsIma/${resortName}.jpg`);

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
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="summary-page">
      <section className="container container-wrapper">
        <div className="form-content">
          <h2 className="mb-5 text-center">Upload Your Ski Resort</h2>
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="resort-image">Resort Image upload</label>
              <input
                id="resort-image"
                type="file"
                onChange={(event) => setResortImage(event.target.files[0])}
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
                onChange={(event) => setNumLifts(Number(event.target.value))}
              />
              <NumInput
                id="ticket-price"
                label="Ticket Price"
                min="0"
                max="1000"
                value={ticketPrice}
                onChange={(event) => setTicketPrice(Number(event.target.value))}
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
