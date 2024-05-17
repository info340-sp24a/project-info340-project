import React, { useState } from 'react';
import { FilterPanel } from './FilterPanel';

export function GenerateSandF({filterResortFunction}){
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


 return( 
 <div className="filter-container">
        <form onSubmit={handleSubmit} id="search">
            <label htmlFor="search-bar" className="visually-hidden">Search Ski Resorts</label>
            <input className="nav-link active search-bar" id="search-bar" placeholder="Search Ski Resort (Type and hit enter)" type="search" name="Search" autoComplete="off" value={searchInput} onChange={handleInputChange}/>
        </form>
        <button className="toggle-btn" onClick={DisplayFilter}>Search Filters</button>
        {isDisplaying && <FilterPanel />}
        <button className="clear-filter">Clear Filters</button>
    </div>
    );
}