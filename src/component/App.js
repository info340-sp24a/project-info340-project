import React, { useState } from 'react';
import {HeaderBar} from './Public/GenerateHeader.js';
import { GenerateSandF } from './Homepage/SearchandFilter.js';
import INITIAL_RESORTS from '../data/resourcedata.json'
import {SummaryApp} from './SkiSummary/SummaryApp.js'
import { CardsPanel } from './Homepage/CardsPanel.js';
import {Footer} from './Public/CreateFooter.js'
import { UploadForm } from './Uploadpage/Upload.js';

export default function App(){

  const [currentInput, setcurrentInput] = useState('');

  const filterResort = (ResortInfo) => {
    setcurrentInput(ResortInfo);
  }

  const filteredResorts = INITIAL_RESORTS.filter(resort => 
    resort.Name.toLowerCase().includes(currentInput)
  );

  return (
      <>
          <HeaderBar />
          <main>
            {/* <SummaryApp /> */}
            {/* <GenerateSandF filterResortFunction = {filterResort}/>
            <CardsPanel resourceData={filteredResorts}/> */}
            <UploadForm />
          </main>
          <Footer />
      </>
  );
}