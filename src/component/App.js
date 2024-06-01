import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { HeaderBar } from './Public/GenerateHeader.js';
import { GenerateSandF } from './Homepage/SearchandFilter.js';
import INITIAL_RESORTS from '../data/resourcedata.json';
import { CardsPanel } from './Homepage/CardsPanel.js';
import { Footer } from './Public/CreateFooter.js';
import { UploadForm } from './Upload.js';
import { ResortComparison } from './ComparePage/ResortComparison.js';
import { SummaryApp } from './Summary.js';
import SignInPage from './SignInPage.js';
import { ResortDetail } from './Public/CreateDetail.js'; // Assuming you have this component

export default function App() {
  const [currentInput, setcurrentInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

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
    resort.Name.toLowerCase().includes(currentInput.toLowerCase()) &&
    resort.State.toLowerCase().includes(stateFilter.toLowerCase()) &&
    (passFilter === '' || resort.Company === passFilter) &&
    resort.Price >= minPrice && resort.Price <= maxPrice &&
    resort["Number of Slopes"] >= minSlope && resort["Number of Slopes"] <= maxSlope
  );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <HeaderBar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <GenerateSandF 
                filterResortFunction={filterResort}
                handleStateChange={handleStateChange}
                handlePassChange={handlePassChange}
                handleMinPriceChange={handleMinPriceChange}
                handleMaxPriceChange={handleMaxPriceChange}
                handleMinSlopeChange={handleMinSlopeChange}
                handleMaxSlopeChange={handleMaxSlopeChange}
              />
              <CardsPanel resourceData={filteredResorts} />
            </>
          } />
          <Route path="index/:resortName" element={<ResortDetail />} />
          <Route path="upload" element={<UploadForm />} />
          <Route path="compare" element={<ResortComparison />} />
          <Route path="/summary" element={<SummaryApp currentUser={currentUser} />} />
          <Route path="/signin" element={<SignInPage currentUser={currentUser} changeUserFunction={setCurrentUser} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
