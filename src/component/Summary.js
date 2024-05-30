import React, { useState } from 'react';
import TESTDATA from '../data/test.json';
import resourceData from '../data/resourcedata.json'; // Import the JSON file
import { TextInput } from "./InputText";
import { NumInput } from "./InputNum";

// SeasonSelector component
function SeasonSelector({ seasons, selectedSeason, onChange }) {
  const seasonOptions = seasons.map((season) => (
    <option key={season} value={season}>{season}</option>
  ));

  return (
    <select value={selectedSeason} onChange={onChange} className="form-select mb-3">
      {seasonOptions}
    </select>
  );
}

// UploadForm component
function UploadForm({ onSubmit }) {
  const [selectedResort, setSelectedResort] = useState("");
  const [skiDate, setSkiDate] = useState("");
  const [skiTime, setSkiTime] = useState(0);
  const [skiDistance, setSkiDistance] = useState(0);
  const [verticalDrop, setVerticalDrop] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [runs, setRuns] = useState(0);
  const [cost, setCost] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      resort: selectedResort,
      date: skiDate,
      skiTime,
      skiDistance,
      verticalDrop,
      speed,
      runs,
      cost,
    };
    console.log("Form submitted:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="container form-content">
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="resort-name" className="form-label">Resort Name</label>
            <select
              id="resort-name"
              className="form-select"
              value={selectedResort}
              onChange={(event) => setSelectedResort(event.target.value)}
            >
              <option value="">Select a resort</option>
              {resourceData.map((resort, index) => (
                <option key={index} value={resort.Name}>
                  {resort.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <TextInput
              id="ski-date"
              label="Ski Date"
              type="date"
              value={skiDate}
              onChange={(event) => setSkiDate(event.target.value)}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <NumInput
              id="ski-time"
              label="Ski Time (hours)"
              min="0"
              value={skiTime}
              onChange={(event) => setSkiTime(Number(event.target.value))}
            />
            <NumInput
              id="ski-distance"
              label="Ski Distance (km)"
              min="0"
              value={skiDistance}
              onChange={(event) => setSkiDistance(Number(event.target.value))}
            />
            <NumInput
              id="vertical-drop"
              label="Vertical Drop (m)"
              min="0"
              value={verticalDrop}
              onChange={(event) => setVerticalDrop(Number(event.target.value))}
            />
          </div>
          <div className="col-md-6">
            <NumInput
              id="speed"
              label="Speed (km/h)"
              min="0"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
            />
            <NumInput
              id="runs"
              label="Runs"
              min="0"
              value={runs}
              onChange={(event) => setRuns(Number(event.target.value))}
            />
            <NumInput
              id="cost"
              label="Cost ($)"
              min="0"
              value={cost}
              onChange={(event) => setCost(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="mt-4 d-grid gap-2 col-2 mx-auto">
          <button type="submit" className="btn btn-outline-primary">Submit</button>
        </div>
      </section>
    </form>
  );
}

// Summary component
function Summary({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available for the selected season</div>;
  }

  const totalSkiDays = data.length;
  const totalSkiHours = data.reduce((sum, session) => sum + session.skiTime, 0);
  const totalSkiDistance = data.reduce((sum, session) => sum + session.skiDistance, 0);
  const totalMoneySpent = data.reduce((sum, session) => sum + session.cost, 0);
  const uniqueResorts = [...new Set(data.map(session => session.resort))].length;
  const resortVisits = data.reduce((acc, session) => {
    acc[session.resort] = (acc[session.resort] || 0) + 1;
    return acc;
  }, {});

  const favoriteResort = Object.keys(resortVisits).reduce((a, b) => resortVisits[a] > resortVisits[b] ? a : b);

  return (
    <div className="summary">
      <h2>Season Summary</h2>
      <div className='container d-flex m-3'>
        <div className='col'>
          <p>Ski Days: {totalSkiDays}</p>
        </div>
        <div className='col'>
          <p>Ski Hours: {totalSkiHours}</p>
        </div>
        <div className='col'>
          <p>Ski Distance: {totalSkiDistance} km</p>
        </div>
      </div>
      <div className='container d-flex m-3'>
        <div className='col'>
          <p>Money Spent: ${totalMoneySpent.toFixed(2)}</p>
        </div>
        <div className='col'>
          <p>Unique Resorts: {uniqueResorts}</p>
        </div>
        <div className='col'>
          <p>Favorite Resort: {favoriteResort}</p>
        </div>
      </div>
    </div>
  );
}

// TopPerformance component
const TopPerformance = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const longestSkiDistance = data.reduce((max, session) => session.skiDistance > max.skiDistance ? session : max, data[0]);
  const maxVerticalDrop = data.reduce((max, session) => session.verticalDrop > max.verticalDrop ? session : max, data[0]);
  const fastestSpeed = data.reduce((max, session) => session.speed > max.speed ? session : max, data[0]);
  const mostRuns = data.reduce((max, session) => session.runs > max.runs ? session : max, data[0]);

  return (
    <div className="">
      <h2>Top Performance</h2>
      <div className="container m-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Resort</th>
              <th scope="col">Value</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Longest Ski Distance</td>
              <td>{longestSkiDistance.resort}</td>
              <td>{longestSkiDistance.skiDistance} km</td>
              <td>{longestSkiDistance.date}</td>
            </tr>
            <tr>
              <td>Max Vertical Drop</td>
              <td>{maxVerticalDrop.resort}</td>
              <td>{maxVerticalDrop.verticalDrop} m</td>
              <td>{maxVerticalDrop.date}</td>
            </tr>
            <tr>
              <td>Fastest Speed</td>
              <td>{fastestSpeed.resort}</td>
              <td>{fastestSpeed.speed} km/h</td>
              <td>{fastestSpeed.date}</td>
            </tr>
            <tr>
              <td>Most Runs in a Day</td>
              <td>{mostRuns.resort}</td>
              <td>{mostRuns.runs}</td>
              <td>{mostRuns.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main component to combine everything
export function SummaryApp() {
  const [selectedSeason, setSelectedSeason] = useState('2023-2024');
  const [seasonData, setSeasonData] = useState(TESTDATA[selectedSeason] || []);
  const seasons = Object.keys(TESTDATA);

  const handleSeasonChange = (event) => {
    const newSeason = event.target.value;
    setSelectedSeason(newSeason);
    setSeasonData(TESTDATA[newSeason] || []);
  };

  const handleFormSubmit = (formData) => {
    // Update the TESTDATA with the new form data
    setSeasonData([...seasonData, formData]);
    console.log("New season data:", seasonData);
  };

  return (
    <div className="SummaryApp">
      <h1>Snow Season Summary</h1>
      <UploadForm onSubmit={handleFormSubmit} />
      <div className="mt-5">
        <SeasonSelector
          seasons={seasons}
          selectedSeason={selectedSeason}
          onChange={handleSeasonChange}
        />
        <Summary data={seasonData} />
        <TopPerformance data={seasonData} />
      </div>
    </div>
  );
}
