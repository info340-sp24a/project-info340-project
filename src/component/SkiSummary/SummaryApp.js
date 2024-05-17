import React, { useState } from 'react';
import TESTDATA from '../../data/test.json';

function SeasonSelector({ seasons, selectedSeason, onChange }) {
  const seasonOptions = seasons.map((season) => (
    <option key={season} value={season}>{season}</option>
  ));

  return (
    <select value={selectedSeason} onChange={onChange} className="form-select">
      {seasonOptions}
    </select>
  );
}

function Summary({ data }) {
  const totalSkiDays = data.length;
  const totalSkiHours = data.reduce((sum, session) => sum + session.skiTime, 0);
  const totalSkiDistance = data.reduce((sum, session) => sum + session.skiDistance, 0);

  return (
    <div className="summary">
      <h2>Season Summary</h2>
      <p>Total Ski Days: {totalSkiDays}</p>
      <p>Total Ski Hours: {totalSkiHours}</p>
      <p>Total Ski Distance: {totalSkiDistance} km</p>
    </div>
  );
}

function TopPerformance({ data }) {
  const longestSkiDistance = data.reduce((max, session) => session.skiDistance > max.skiDistance ? session : max, data[0]);
  const maxVerticalDrop = data.reduce((max, session) => session.verticalDrop > max.verticalDrop ? session : max, data[0]);
  const fastestSpeed = data.reduce((max, session) => session.speed > max.speed ? session : max, data[0]);
  const mostRuns = data.reduce((max, session) => session.runs > max.runs ? session : max, data[0]);
  const earliestArrival = data.reduce((earliest, session) => new Date(`1970-01-01T${session.arrivalTime}`) < new Date(`1970-01-01T${earliest.arrivalTime}`) ? session : earliest, data[0]);
  const coldestDay = data.reduce((coldest, session) => session.temperature < coldest.temperature ? session : coldest, data[0]);
  const bestSkiPartner = data.reduce((acc, session) => {
    acc[session.skiPartner] = (acc[session.skiPartner] || 0) + 1;
    return acc;
  }, {});

  const bestSkiPartnerName = Object.keys(bestSkiPartner).reduce((a, b) => bestSkiPartner[a] > bestSkiPartner[b] ? a : b);

  return (
    <div className="top-performance">
      <h2>Top Performance</h2>
      <p>Longest Ski Distance: {longestSkiDistance.skiDistance} km on {longestSkiDistance.date} at {longestSkiDistance.resort}</p>
      <p>Max Vertical Drop: {maxVerticalDrop.verticalDrop} m on {maxVerticalDrop.date} at {maxVerticalDrop.resort}</p>
      <p>Fastest Speed: {fastestSpeed.speed} km/h on {fastestSpeed.date} at {fastestSpeed.resort}</p>
      <p>Most Runs in a Day: {mostRuns.runs} on {mostRuns.date} at {mostRuns.resort}</p>
      <p>Earliest Arrival: {earliestArrival.arrivalTime} on {earliestArrival.date} at {earliestArrival.resort}</p>
      <p>Coldest Day: {coldestDay.temperature}°C on {coldestDay.date} at {coldestDay.resort}</p>
      <p>Best Ski Partner: {bestSkiPartnerName}</p>
    </div>
  );
}

export function SummaryApp() {
  const [selectedSeason, setSelectedSeason] = useState('2023-2024');
  const seasons = Object.keys(TESTDATA);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <div className="App">
      <h1>Snow Season Summary</h1>
      <SeasonSelector
        seasons={seasons}
        selectedSeason={selectedSeason}
        onChange={handleSeasonChange}
      />
      <Summary data={TESTDATA[selectedSeason]} />
      <TopPerformance data={TESTDATA[selectedSeason]} />
    </div>
  );
}