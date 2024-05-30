import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HeaderBar } from './Public/GenerateHeader.js';
import { GenerateSandF } from './Homepage/SearchandFilter.js';
import INITIAL_RESORTS from '../data/resourcedata.json';
import { CardsPanel } from './Homepage/CardsPanel.js';
import { Footer } from './Public/CreateFooter.js';
import { UploadForm } from './Upload.js';
import { ResortComparison } from './ComparePage/ResortComparison.js';
import { SummaryApp } from './Summary.js';

export default function App() {
  const [currentInput, setcurrentInput] = useState('');

  const filterResort = (ResortInfo) => {
    setcurrentInput(ResortInfo);
  }

  const filteredResorts = INITIAL_RESORTS.filter(resort =>
    resort.Name.toLowerCase().includes(currentInput.toLocaleLowerCase())
  );

  return (
    <Router>
      <>
        <HeaderBar />
        <main>
          <Routes>
          <Route path="/" element={
                <>
                  <GenerateSandF filterResortFunction={filterResort} />
                  <CardsPanel resourceData={filteredResorts} />
                </> }/>
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/compare" element={<ResortComparison />} />
            <Route path="/summary" element={<SummaryApp />} />
          </Routes>
        </main>
        <Footer />
      </>
    </Router>
  );
}