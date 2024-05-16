import React, { useState } from 'react';
import {HeaderBar} from './GenerateHeader';
import { GenerateSandF } from './SearchandFilter';
import INITIAL_RESORTS from '../data/resourcedata.json'
import { CardsPanel } from './CardsPanel';

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
                <GenerateSandF filterResortFunction = {filterResort}/>
                <CardsPanel resourceData={filteredResorts}/>
            </main>
        </>
    );
}