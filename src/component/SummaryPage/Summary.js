import React, { useState } from 'react';
import TESTDATA from '../../data/test.json';

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

function Summary({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available for the selected season</div>;
  }

  const totalSkiDays = data.length;
  const totalSkiHours = data.reduce((sum, session) => sum + session.skiTime, 0);
  const totalSkiDistance = data.reduce((sum, session) => sum + session.skiDistance, 0);

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
    </div>
  );
}

const TopPerformance = ({ data, bestSkiPartnerName }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const longestSkiDistance = data.reduce((max, session) => session.skiDistance > max.skiDistance ? session : max, data[0]);
  const maxVerticalDrop = data.reduce((max, session) => session.verticalDrop > max.verticalDrop ? session : max, data[0]);
  const fastestSpeed = data.reduce((max, session) => session.speed > max.speed ? session : max, data[0]);
  const mostRuns = data.reduce((max, session) => session.runs > max.runs ? session : max, data[0]);
  const earliestArrival = data.reduce((earliest, session) => new Date(`1970-01-01T${session.arrivalTime}`) < new Date(`1970-01-01T${earliest.arrivalTime}`) ? session : earliest, data[0]);
  const coldestDay = data.reduce((coldest, session) => session.temperature < coldest.temperature ? session : coldest, data[0]);

  return (
    <div className="">
      <h2>Top Performance</h2>
      <div className='container m-3'>
        <div className='row'>
          <div className='col'>
            <p>Longest Ski Distance:</p>
          </div>
          <div className='col'>
            {longestSkiDistance.resort}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {longestSkiDistance.skiDistance} km
          </div>
          <div className='col'>
            {longestSkiDistance.date}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>Max Vertical Drop:</p>
          </div>
          <div className='col'>
            {maxVerticalDrop.resort}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {maxVerticalDrop.verticalDrop} m
          </div>
          <div className='col'>
            {maxVerticalDrop.date}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>Fastest Speed:</p>
          </div>
          <div className='col'>
            {fastestSpeed.resort}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {fastestSpeed.speed} km/h
          </div>
          <div className='col'>
            {fastestSpeed.date}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>Most Runs in a Day:</p>
          </div>
          <div className='col'>
            {mostRuns.resort}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {mostRuns.runs}
          </div>
          <div className='col'>
            {mostRuns.date}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>Earliest Arrival:</p>
          </div>
          <div className='col'>
            {earliestArrival.resort}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {earliestArrival.arrivalTime}
          </div>
          <div className='col'>
            {earliestArrival.date}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>Coldest Day:</p>
          </div>
          <div className='col'>
            {coldestDay.resort}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {coldestDay.temperature}°C
          </div>
          <div className='col'>
            {coldestDay.date}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>Best Ski Partner:</p>
          </div>
          <div className='col'>
            {bestSkiPartnerName}
          </div>
        </div>
      </div>
    </div>
  );
};

export function SummaryApp() {
  const [selectedSeason, setSelectedSeason] = useState('2023-2024');
  const seasons = Object.keys(TESTDATA);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const selectedSeasonData = TESTDATA[selectedSeason] || [];

  return (
    <div className="App">
      <h1>Snow Season Summary</h1>
      <SeasonSelector
        seasons={seasons}
        selectedSeason={selectedSeason}
        onChange={handleSeasonChange}
      />
      <Summary data={selectedSeasonData} />
      <TopPerformance data={selectedSeasonData} />
    </div>
  );
}