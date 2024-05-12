import React from "react"
import '../index.css'

export function UploadForm(props) {
    return (
        <form>
            <div className="container form-content">
                <div className="justify-content-evenly mt-4">
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <label htmlFor="resort-name" className="form-label">Resort Name:</label>
                            <input type="text" id="resort-name" placeholder="Enter the resort name" className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="state" className="form-label">State:</label>
                            <select className="form-select" id="state">
                                <option selected>Select the state</option>
                                <option value="AL">AL</option>
                                <option value="AK">AK</option>
                                <option value="AZ">AZ</option>
                                <option value="AR">AR</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DE">DE</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="IA">IA</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="ME">ME</option>
                                <option value="MD">MD</option>
                                <option value="MA">MA</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MS">MS</option>
                                <option value="MO">MO</option>
                                <option value="MT">MT</option>
                                <option value="NE">NE</option>
                                <option value="NV">NV</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NY">NY</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="OH">OH</option>
                                <option value="OK">OK</option>
                                <option value="OR">OR</option>
                                <option value="PA">PA</option>
                                <option value="RI">RI</option>
                                <option value="SC">SC</option>
                                <option value="SD">SD</option>
                                <option value="TN">TN</option>
                                <option value="TX">TX</option>
                                <option value="UT">UT</option>
                                <option value="VT">VT</option>
                                <option value="VA">VA</option>
                                <option value="WA">WA</option>
                                <option value="WV">WV</option>
                                <option value="WI">WI</option>
                                <option value="WY">WY</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label for="description" className="form-label">Brief Description:</label>
                            <input type="text" id="description" placeholder="Enter a brief description" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label for="num-lifts" className="form-label">Number of Lifts:</label>
                            <input type="range" className="form-range" min="0" max="50" id="lift-range" />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label for="ticket-price" className="form-label">Ticket Price ($):</label>
                            <input type="number" id="ticket-price" placeholder="Enter ticket price" className="form-control" />
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
                            <input type="file" id="resort-image" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 d-grid gap-2 col-2 mx-auto">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    )
}