import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { TextInput } from "./InputText";
import { NumInput } from "./InputNum";
import '../index.css'; 

function SeasonSelector({ seasons, selectedSeason, onChange }) {
  if (seasons.length === 0) {
    return null;
  }

  const seasonOptions = seasons.map((season) => (
    <option key={season} value={season}>{season}</option>
  ));

  return (
    <select value={selectedSeason} onChange={onChange} className="form-select mb-3">
      {seasonOptions}
    </select>
  );
}

function UploadForm({ onSubmit, currentUser }) {
  const [resorts, setResorts] = useState([]);
  const [selectedResort, setSelectedResort] = useState("");
  const [skiDate, setSkiDate] = useState("");
  const [skiTime, setSkiTime] = useState(0);
  const [skiDistance, setSkiDistance] = useState(0);
  const [verticalDrop, setVerticalDrop] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [runs, setRuns] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const resortsRef = ref(db, 'Resorts');
    
    onValue(resortsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const resortsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setResorts(resortsArray);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentUser) {
      console.error("User not signed in");
      return;
    }

    const selectedResortName = resorts.find(resort => resort.id === selectedResort)?.resortName || "";

    const formData = {
      resortName: selectedResortName,
      date: skiDate,
      skiTime,
      skiDistance: Number(skiDistance),
      verticalDrop: Number(verticalDrop),
      speed: Number(speed),
      runs: Number(runs),
      cost: Number(cost),
    };
    console.log("Form submitted:", formData);
    onSubmit(formData);
    setSelectedResort("");
    setSkiDate("");
    setSkiTime(0);
    setSkiDistance(0);
    setVerticalDrop(0);
    setSpeed(0);
    setRuns(0);
    setCost(0);
  };

  return (
    <form onSubmit={handleSubmit} className="col-12 col-lg-6 mb-3 mx-auto">
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
              {resorts.map((resort) => (
                <option key={resort.id} value={resort.id}>
                  {resort.resortName}
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
              max="24"
              value={skiTime}
              onChange={(event) => setSkiTime(Number(event.target.value))}
            />
            <TextInput
              id="ski-distance"
              type="number"
              label="Ski Distance (km)"
              value={skiDistance}
              onChange={(event) => setSkiDistance(Number(event.target.value))}
            />
            <TextInput
              id="vertical-drop"
              type="number"
              label="Vertical Drop (m)"
              value={verticalDrop}
              onChange={(event) => setVerticalDrop(Number(event.target.value))}
            />
          </div>
          <div className="col-md-6">
            <NumInput
              id="speed"
              label="Speed (km/h)"
              min="0"
              max="255"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
            />
            <TextInput
              id="runs"
              type="number"
              label="Runs"
              value={runs}
              onChange={(event) => setRuns(Number(event.target.value))}
            />
            <TextInput
              id="cost"
              type="number"
              label="Cost ($)"
              value={cost}
              onChange={(event) => setCost(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="mt-4 d-grid gap-2 col-6 mx-auto">
        {currentUser ? (
          <button type="submit" className="btn btn-outline-light">Submit</button>
        ) : (
          <>
            <button type="submit" className="btn btn-danger" disabled={!currentUser}>Submit</button>
            <div className="alert alert-warning mt-2" role="alert">
              You need to sign in to submit data.
            </div>
          </>
        )}
        </div>
      </section>
    </form>
  );
}

function Summary({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        No data available for the selected season.
      </div>
    );
  }

  const totalSkiDays = data.length;
  const totalSkiHours = data.reduce((sum, session) => sum + session.skiTime, 0);
  const totalSkiDistance = data.reduce((sum, session) => sum + session.skiDistance, 0);
  const totalMoneySpent = data.reduce((sum, session) => sum + session.cost, 0);
  const uniqueResorts = [...new Set(data.map(session => session.resortName))].length;
  const resortVisits = data.reduce((acc, session) => {
    acc[session.resortName] = (acc[session.resortName] || 0) + 1;
    return acc;
  }, {});

  const favoriteResort = Object.keys(resortVisits).reduce((a, b) => resortVisits[a] > resortVisits[b] ? a : b);

  return (
    <div className="summary">
      <h2>Season Summary</h2>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <p>Ski Days: {totalSkiDays}</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <p>Ski Hours: {totalSkiHours}</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <p>Ski Distance: {totalSkiDistance} km</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <p>Money Spent: ${totalMoneySpent}</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <p>Unique Resorts: {uniqueResorts}</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <p>Favorite Resort: {favoriteResort}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const TopPerformance = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        Please enter your ski trips to generate a report.
      </div>
    );
  }

  const longestSkiDistance = data.reduce((max, session) => session.skiDistance > max.skiDistance ? session : max, data[0]);
  const maxVerticalDrop = data.reduce((max, session) => session.verticalDrop > max.verticalDrop ? session : max, data[0]);
  const fastestSpeed = data.reduce((max, session) => session.speed > max.speed ? session : max, data[0]);
  const mostRuns = data.reduce((max, session) => session.runs > max.runs ? session : max, data[0]);

  const performanceData = [
    {
      metric: 'Longest Ski Distance',
      resortName: longestSkiDistance.resortName,
      value: `${longestSkiDistance.skiDistance} km`,
      date: longestSkiDistance.date,
    },
    {
      metric: 'Max Vertical Drop',
      resortName: maxVerticalDrop.resortName,
      value: `${maxVerticalDrop.verticalDrop} m`,
      date: maxVerticalDrop.date,
    },
    {
      metric: 'Fastest Speed',
      resortName: fastestSpeed.resortName,
      value: `${fastestSpeed.speed} km/h`,
      date: fastestSpeed.date,
    },
    {
      metric: 'Most Runs in a Day',
      resortName: mostRuns.resortName,
      value: mostRuns.runs,
      date: mostRuns.date,
    },
  ];

  return (
    <div className="top-performance">
      <h2>Top Performance</h2>
      <div className="container">
        <div className="row">
          {performanceData.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.metric}</h5>
                  <p className="card-text"><strong>Resort:</strong> {item.resortName}</p>
                  <p className="card-text"><strong>Value:</strong> {item.value}</p>
                  <p className="card-text"><strong>Date:</strong> {item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformance;

export function SummaryApp({ currentUser }) {
  const [selectedSeason, setSelectedSeason] = useState('2023-2024');
  const [seasonData, setSeasonData] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const db = getDatabase();
    const userSeasonsRef = ref(db, `users/${currentUser.userId}/seasons`);

    onValue(userSeasonsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const seasonKeys = Object.keys(data);
        setSeasons(seasonKeys);
        if (seasonKeys.includes(selectedSeason)) {
          setSeasonData(Object.values(data[selectedSeason]));
        } else {
          setSeasonData([]);
        }
      } else {
        setSeasons([]);
        setSeasonData([]);
      }
    });
  }, [currentUser, selectedSeason]);

  const handleSeasonChange = (event) => {
    const newSeason = event.target.value;
    setSelectedSeason(newSeason);
  };

  const handleFormSubmit = (formData) => {
    if (!currentUser) {
      console.error("User not signed in");
      return;
    }

    const db = getDatabase();
    const seasonRef = ref(db, `users/${currentUser.userId}/seasons/${selectedSeason}`);
    const newTripRef = push(seasonRef);
    set(newTripRef, formData);
  };

  return (
    <div className='summary-page'>
      <div className="container-wrapper">
        <h1 className="text-center m-5">Snow Season Summary</h1>
        <div className="d-flex justify-content-center">
          <div className="row w-100">
            <UploadForm onSubmit={handleFormSubmit} currentUser={currentUser} />
            <div className="col-12 col-lg-6 mx-auto">
              <SeasonSelector
                seasons={seasons}
                selectedSeason={selectedSeason}
                onChange={handleSeasonChange}
              />
              <Summary data={seasonData} />
              <TopPerformance data={seasonData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
