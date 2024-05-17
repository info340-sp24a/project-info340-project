import React from "react"

function StateSelector(props) {
    const StateOptions = [
        "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
        "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
        "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
        "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
        "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
        "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin",
        "Wyoming"]

    const stateArray = StateOptions.map((state) => {
        const transformed = (
            <option key={state} value={state}>{state}</option>
        )
        return transformed
    })
  
    return (
      <select id="state" className="form-select" defaultValue='Select the state'>
        <option disabled>Select the state</option>
        {stateArray}
      </select>
    );
  }



  export function UploadForm(props) {
    return (
        <form>
            <div className="container form-content">
                <div className="row mb-4">
                    {/* Photo Upload */}
                    
                    <div className="col-md-6">
                        <label htmlFor="resort-image" className="form-label">Resort Image upload:</label>
                        <input type="file" id="resort-image" className="form-control photo-upload"/>
                    </div>

                    {/* Form Content */}
                    <div className="col-md-6">
                        <label htmlFor="resort-name" className="form-label">Resort Name:</label>
                        <input type="text" id="resort-name" placeholder="Enter the resort name" className="form-control" />
                    
                        <label htmlFor="state" className="form-label">State:</label>
                        <StateSelector />

                        <label htmlFor="description" className="form-label">Brief Description:</label>
                        <input type="text" id="description" placeholder="Enter a brief description" className="form-control"/>

                        <label htmlFor="num-lifts" className="form-label">Number of Lifts:</label>
                        <input type="range" className="form-range" min="0" max="50" id="num-lifts"/>

                        <label htmlFor="ticket-price" className="form-label">Ticket Price ($):</label>
                        <input type="number" id="ticket-price" placeholder="Enter ticket price" className="form-control"/>

                        <label htmlFor="pass-company" className="form-label">Pass Company:</label>
                        <select className="form-select" id="pass-company" defaultValue='Select the company'>
                            <option disabled>Select the company</option>
                            <option value="IKON">IKON</option>
                            <option value="EPIC">EPIC</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 d-grid gap-2 col-2 mx-auto">
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                </div>
            </div>
        </form>
    );
}