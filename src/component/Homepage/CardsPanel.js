import React from 'react';
import { GenerateCard } from './GenerateCard';

export function CardsPanel(props){
const {resourceData} = props;

const Allcards = resourceData.map((resort) => {
    return <GenerateCard key={resort.Name} resortData = {resort}/>
});

return (
    <div className="row">
        {Allcards}
    </div>
);
}