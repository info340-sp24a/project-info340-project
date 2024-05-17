import React, { useState } from 'react';

export function FilterPanel(props){
  const StateOptions = [
        "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
        "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
        "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
        "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
        "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
        "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin",
        "Wyoming"]

    const StateChoice = StateOptions.map((state) => {
        return <option key= {state} value={state}>{state}</option>
    })

    return(
        <div className="advanced-search-active">
        <div className='search-sc'>
        <h3>State</h3>
        <label htmlFor="stateSelect" className="form-label">Resort Image upload:</label>
        <select id="stateSelect" className="state-select" defaultValue='Select the state'>
            <option disabled>Select the state</option>
            {StateChoice}
        </select>
        <h3>Pass</h3>
        <select id="passSelect" className="pass-select" defaultValue='Select the company'>
            <option disabled>Select the company</option>
            <option value='IKON'>IKON</option>
            <option value='EPIC'>EPIC</option>
            <option value='Other'>Other</option>
        </select>
    </div>
    <div className='search-pn'>
        <form className="number-range" id='mi'>
            <h3>Price</h3>
            <label htmlFor="minPrice">Min:</label>
            <br />
            <input id="minPrice" className="number-input" type="number" name="min price" autoComplete="off" defaultValue={1} />
            <br />
            <label htmlFor="maxPrice">Max:</label>
            <br />
            <input id="maxPrice" className="number-input" type="number" name="max price" autoComplete="off" defaultValue={151} />
        </form>
        <form className="number-range">
            <h3>Number of Slopes</h3>
            <label htmlFor="minSlope">Min:</label>
            <br />
            <input id="minSlope" className="number-input" type="number" name="min slope" autoComplete="off" defaultValue={1} />
            <br />
            <label htmlFor="maxSlope">Max:</label>
            <br />
            <input id="maxSlope" className="number-input" type="number" name="max slope" autoComplete="off" defaultValue={151} />
        </form>
    </div>
</div>
    );
}