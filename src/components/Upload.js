import React from "react"
import '../index.css'

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
      <select className="form-select">
        <option selected>Select the state</option>
        {stateArray}
      </select>
    );
  }



export function UploadForm(props) {
    return (
        <form>
            <div className="container form-content">
                <div className="justify-content-evenly mt-4">
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label for="resort-name" className="form-label">Resort Name:</label>
                            <input type="text" id="resort-name" placeholder="Enter the resort name" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label for="state" className="form-label">State:</label>
                            {StateSelector}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label for="description" className="form-label">Brief Description:</label>
                            <input type="text" id="description" placeholder="Enter a brief description" className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label for="num-lifts" className="form-label">Number of Lifts:</label>
                            <input type="range" className="form-range" min="0" max="50" id="lift-range"/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label for="ticket-price" className="form-label">Ticket Price ($):</label>
                            <input type="number" id="ticket-price" placeholder="Enter ticket price" className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label for="pass-company" className="form-label">Pass Company:</label>
                            <select className="form-select" id="pass-company">
                                <option selected>Select the company</option>
                                <option value="IKON">IKON</option>
                                <option value="EPIC">EPIC</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label for="resort-image" className="form-label">Resort Image:</label>
                            <input type="file" id="resort-image" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="mt-4 d-grid gap-2 col-2 mx-auto">
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                </div>
            </div>
        </form>
    )
}