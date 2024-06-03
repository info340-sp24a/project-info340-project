import React, { useState } from 'react';

export function FilterPanel({handleStatedataChange,
    handlePassdataChange,
    handleMinPricedataChange,
    handleMaxPricedataChange,
    handleMinSlopedataChange,
    handleMaxSlopedataChange}){
  const StateOptions = [
        "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
        "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
        "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
        "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
        "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
        "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin",
        "Wyoming"]

    const [selectedState, setSelectedState] = useState('');
    const [selectedPass, setSelectedPass] = useState('');
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minSlope, setMinSlope] = useState(1);
    const [maxSlope, setMaxSlope] = useState(1000);


    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        handleStatedataChange(e.target.value);
      };
    
      const handlePassChange = (e) => {
        setSelectedPass(e.target.value);
        handlePassdataChange(e.target.value);
      };
    
      const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        handleMinPricedataChange(e.target.value);
      };
    
      const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        handleMaxPricedataChange(e.target.value);
      };
    
      const handleMinSlopeChange = (e) => {
        setMinSlope(e.target.value);
        handleMinSlopedataChange(e.target.value);
      };
    
      const handleMaxSlopeChange = (e) => {
        setMaxSlope(e.target.value);
        handleMaxSlopedataChange(e.target.value);
      };


    const StateChoice = StateOptions.map((state) => {
        return <option key= {state} value={state}>{state}</option>
    })

    return(
        <div className="advanced-search-active">
        <div className='search-sc'>
        <h3>State</h3>
        <select id="stateSelect" className="state-select" value={selectedState} 
          onChange={handleStateChange}>
            <option value=''>Select the state</option>
            {StateChoice}
        </select>
        <h3>Pass</h3>
        <select id="passSelect" className="pass-select" value={selectedPass} 
          onChange={handlePassChange}>
            <option value=''>Select the company</option>
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
            <input id="minPrice" className="number-input" type="number" name="min price" autoComplete="off" value={minPrice} 
            onChange={handleMinPriceChange}/>
            <br />
            <label htmlFor="maxPrice">Max:</label>
            <br />
            <input id="maxPrice" className="number-input" type="number" name="max price" autoComplete="off" value={maxPrice} 
            onChange={handleMaxPriceChange}/>
        </form>
        <form className="number-range">
            <h3>Number of Slopes</h3>
            <label htmlFor="minSlope">Min:</label>
            <br />
            <input id="minSlope" className="number-input" type="number" name="min slope" autoComplete="off" value={minSlope} 
            onChange={handleMinSlopeChange}/>
            <br />
            <label htmlFor="maxSlope">Max:</label>
            <br />
            <input id="maxSlope" className="number-input" type="number" name="max slope" autoComplete="off" value={maxSlope} 
            onChange={handleMaxSlopeChange}/>
        </form>
    </div>
</div>
    );
}