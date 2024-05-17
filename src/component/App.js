import React, { useState } from 'react';
import {HeaderBar} from './Public/GenerateHeader.js';
import { GenerateSandF } from './Homepage/SearchandFilter.js';
import INITIAL_RESORTS from '../data/resourcedata.json'
import { CardsPanel } from './Homepage/CardsPanel.js';
import {Footer} from './Public/CreateFooter.js'
import { UploadForm } from './Uploadpage/Upload.js';
import { CreateCrystal } from './Public/Crystal.js';
import { CreateBaker } from './Public/Baker.js';
import { CreateSnoq } from './Public/Snoqualmie.js';
import { CreateSteve } from './Public/Steve.js';

export default function App(){

  const [currentInput, setcurrentInput] = useState('');

  const filterResort = (ResortInfo) => {
    setcurrentInput(ResortInfo);
  }

  const filteredResorts = INITIAL_RESORTS.filter(resort => 
    resort.Name.toLowerCase().includes(currentInput.toLocaleLowerCase())
  );

  return (
      <>
          <HeaderBar />
          <main>
              <GenerateSandF filterResortFunction = {filterResort}/>
              <CardsPanel resourceData={filteredResorts}/>
              {/*<UploadForm />*/}
              {/*<CreateCrystal />*/}
              {/*<CreateBaker />*/}
              {/*<CreateSnoq />*/}
              {/*<CreateSteve />*/}
          </main>
          <Footer />
      </>
  );
}