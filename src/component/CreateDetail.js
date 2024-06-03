import React from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

export function ResortDetail(props) {
  const { resourceData } = props;
  const { resortName } = useParams(); // Get the resort name from the URL parameters
  const ResortNameString = resortName; // This is already the correct value
  // Find the resort in the data using lodash
  let resort = _.find(resourceData, { firebaseKey: ResortNameString });

  // If the resort is not found, show a message
  if (!resort) return <h2>No resort specified</h2>;

  // Render the resort details
  return (
    <div className="introduction">
      <img src={resort.resortImage} className="d-none d-md-block" alt={resort.resortName} />
      {/* You can add more resort details here */}
      <article>
        <h1>Crystal Mountain Resort</h1>
        <h3>State</h3>
        <p>{resort.state}</p>
        <h3>Price</h3>
        <p>{resort.ticketPrice}</p>
        <h3>Number of Slopes
        </h3>
        <p>{resort.numLifts}</p>
        <h3>Description</h3>
        <p>{resort.description}</p>
        <h3>Company</h3>
        <p>{resort.passCompany}</p>
      </article>
    </div>
  );
}