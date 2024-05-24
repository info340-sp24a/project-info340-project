import React from 'react';
import { useParams } from 'react-router-dom';
import INITIAL_RESORTS from '../../data/resourcedata.json';
import _ from 'lodash';

export function ResortDetail(props) {
  const { resortName } = useParams(); // Get the resort name from the URL parameters
  const ResortNameString = resortName; // This is already the correct value
  console.log(ResortNameString);
  // Find the resort in the data using lodash
  let resort = _.find(INITIAL_RESORTS, { Name: ResortNameString });

  // If the resort is not found, show a message
  if (!resort) return <h2>No resort specified</h2>;

  // Render the resort details
  return (
    <div className="introduction">
      <img src={resort.img} className="d-none d-md-block" alt={resort.name} />
      {/* You can add more resort details here */}
      <article>
        <h1>Crystal Mountain Resort</h1>
        <h3>State</h3>
        <p>{resort.State}</p>
        <h3>Price</h3>
        <p>{resort.Price}</p>
        <h3>Number of Slopes
        </h3>
        <p>{resort["Number of Slopes"]}</p>
        <h3>Description</h3>
        <p>{resort.Description}</p>
        <h3>Company</h3>
        <p>{resort.Company}</p>
      </article>
    </div>
  );
}