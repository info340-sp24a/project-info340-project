import React, { useState } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';

import {HeaderBar} from './Public/GenerateHeader.js';
import { GenerateSandF } from './Homepage/SearchandFilter.js';
import INITIAL_RESORTS from '../data/resourcedata.json';
import { CardsPanel } from './Homepage/CardsPanel.js';
import {Footer} from './Public/CreateFooter.js'
import { UploadForm } from './Uploadpage/Upload.js';
import { ResortComparison } from './ComparePage/ResortComparison.js';
import { ResortDetail } from './Public/CreateDetail.js';

export default function App(){

  const [currentInput, setcurrentInput] = useState('');

  const filterResort = (ResortInfo) => {
    setcurrentInput(ResortInfo);
  }

  const [stateFilter, setStateFilter] = useState('');
  const [passFilter, setPassFilter] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minSlope, setMinSlope] = useState(0);
  const [maxSlope, setMaxSlope] = useState(1000);

  const handleStateChange = (state) => {
    setStateFilter(state);
  };

  const handlePassChange = (pass) => {
    setPassFilter(pass);
  };

  const handleMinPriceChange = (price) => {
    setMinPrice(price);
  };

  const handleMaxPriceChange = (price) => {
    setMaxPrice(price);
  };

  const handleMinSlopeChange = (slope) => {
    setMinSlope(slope);
  };

  const handleMaxSlopeChange = (slope) => {
    setMaxSlope(slope);
  };


  const filteredResorts = INITIAL_RESORTS.filter(resort => 
    resort.Name.toLowerCase().includes(currentInput.toLocaleLowerCase()) &&
    resort.State.toLowerCase().includes(stateFilter.toLowerCase()) &&
    (passFilter === '' || resort.Company === passFilter) &&
    resort.Price >= minPrice && resort.Price <= maxPrice &&
    resort["Number of Slopes"] >= minSlope && resort["Number of Slopes"] <= maxSlope
  );

  return (
      <>
          <HeaderBar />
          <main>
              <Routes>
              <Route path="index" element={<>
                      <GenerateSandF filterResortFunction = {filterResort} 
                      handleStateChange={handleStateChange}
                      handlePassChange={handlePassChange}
                      handleMinPriceChange={handleMinPriceChange}
                      handleMaxPriceChange={handleMaxPriceChange}
                      handleMinSlopeChange={handleMinSlopeChange}
                      handleMaxSlopeChange={handleMaxSlopeChange}
                      />
                      <CardsPanel resourceData={filteredResorts}/></>} />
              <Route path="index/:resortName" element={<ResortDetail />} />
              <Route path="upload" element={<UploadForm />} />
              <Route path="compare" element={<ResortComparison />} />
              <Route path="*" element={<Navigate to="/index" />} />
              </Routes>
          </main>
          <Footer />
      </>
  );
}
