import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
import { HeaderBar } from './Public/GenerateHeader.js';
import { GenerateSandF } from './Homepage/SearchandFilter.js';
import INITIAL_RESORTS from '../data/resourcedata.json';
import { CardsPanel } from './Homepage/CardsPanel.js';
import { Footer } from './Public/CreateFooter.js';
import { UploadForm } from './Upload.js';
import { ResortComparison } from './ComparePage/ResortComparison.js';
import { SummaryApp } from './Summary.js';
import SignInPage from './SignInPage.js';

export default function App() {
  const [currentInput, setcurrentInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const filterResort = (ResortInfo) => {
    setcurrentInput(ResortInfo);
  }

  const filteredResorts = INITIAL_RESORTS.filter(resort =>
    resort.Name.toLowerCase().includes(currentInput.toLocaleLowerCase())
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
    <Router>
      <>
        <HeaderBar currentUser={currentUser} />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <GenerateSandF filterResortFunction={filterResort} />
                <CardsPanel resourceData={filteredResorts} />
              </>
            }/>
            <Route path="/compare" element={<ResortComparison />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/summary" element={<SummaryApp currentUser={currentUser} />} />
            <Route path="/signin" element={<SignInPage currentUser={currentUser} changeUserFunction={setCurrentUser} />} />
          </Routes>
        </main>
        <Footer />
      </>
    </Router>
  );
}
