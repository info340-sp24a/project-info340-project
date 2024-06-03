import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onValue, ref} from 'firebase/database';
import { HeaderBar } from './GenerateHeader.js';
import { GenerateSandF } from './SearchandFilter.js';
import { CardsPanel } from './CardsPanel.js';
import { Footer } from './CreateFooter.js';
import { UploadForm } from './Upload.js';
import { ResortComparison } from './ResortComparison.js';
import { SummaryApp } from './Summary.js';
import SignInPage from './SignInPage.js';
import { ResortDetail } from './CreateDetail.js'; 


export default function App() {
  const [currentInput, setcurrentInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [allResorts, setallResorts] = useState([]);

  const changeUserFunction = (user) => {
    setCurrentUser(user);
  };

  const filterResort = (ResortInfo) => {
    setcurrentInput(ResortInfo);
  };

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


  const filteredResorts = allResorts.filter(resort => 
    resort.resortName.toLowerCase().includes(currentInput.toLowerCase()) &&
    resort.state.toLowerCase().includes(stateFilter.toLowerCase()) &&
    (passFilter === '' || resort.passCompany === passFilter) &&
    resort.ticketPrice >= minPrice && resort.ticketPrice <= maxPrice &&
    resort.numLifts >= minSlope && resort.numLifts <= maxSlope
  );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const resortRef = ref(db, 'Resorts');

    onValue(resortRef, (snapshot) => {
      const allResortObj = snapshot.val();
      if (allResortObj) {
        const keyArray = Object.keys(allResortObj);
        const allResortArray = keyArray.map((key) => {
          const transformed = allResortObj[key];
          transformed.firebaseKey = key;
          return transformed;
        });
        setallResorts(allResortArray);
      } else {
        setallResorts([]); 
      }
    });
  }, []);

  return (
    <>
        <HeaderBar currentUser={currentUser} changeUserFunction={changeUserFunction} />
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
                <CardsPanel resourceData={filteredResorts}/>
              </>
            }/>
            <Route path="index/:resortName" element={<ResortDetail resourceData={filteredResorts}/>} />
            <Route path="/compare" element={<ResortComparison allResorts={allResorts} />} />
            <Route path="/upload" element={<UploadForm currentUser={currentUser} />} />
            <Route path="/summary" element={<SummaryApp currentUser={currentUser} />} />
            <Route path="/signin" element={<SignInPage currentUser={currentUser} changeUserFunction={changeUserFunction} />} />
          </Routes>
        </main>
        <Footer />
    </>
  );
}