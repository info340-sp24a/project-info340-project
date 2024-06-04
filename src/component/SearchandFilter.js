import React, { useState } from 'react';
import { FilterPanel } from './FilterPanel';

export function GenerateSandF({filterResortFunction, handleStateChange, handlePassChange, handleMinPriceChange, handleMaxPriceChange,
    handleMinSlopeChange,
    handleMaxSlopeChange}){
    const [isDisplaying, setisDisplaying] = useState();

    const [searchInput, setSearchInput] = useState('');
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        filterResortFunction(searchInput);
    };

    const DisplayFilter = () => {
        setisDisplaying(!isDisplaying);
    };

    const clearFilters = () => {
        setSearchInput('');
        filterResortFunction('');
        handleStateChange('');
        handlePassChange('');
        handleMinPriceChange(1);
        handleMaxPriceChange(1000);
        handleMinSlopeChange(1);
        handleMaxSlopeChange(1000);
      };
    
 return( 
 <div className="filter-container">
        <form onSubmit={handleSubmit} id="search">
            <label htmlFor="search-bar" className="visually-hidden">Search Ski Resorts</label>
            <input className="nav-link active search-bar" id="search-bar" placeholder="Search Ski Resort (Type and hit enter)" type="search" name="Search" autoComplete="off" value={searchInput} onChange={handleInputChange}/>
        </form>
        <button className="toggle-btn" onClick={DisplayFilter}>Search Filters</button>
        {isDisplaying && <FilterPanel handleStatedataChange = {handleStateChange}
        handlePassdataChange = {handlePassChange} 
        handleMinPricedataChange = {handleMinPriceChange} 
        handleMaxPricedataChange = {handleMaxPriceChange} 
        handleMinSlopedataChange = {handleMinSlopeChange} 
        handleMaxSlopedataChange = {handleMaxSlopeChange}
        />}
        <button className="clear-filter" onClick={clearFilters}>Clear Filters</button>
    </div>
    );
}