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

function TopPerformance({ data }) {
  const longestSkiDistance = data.reduce((max, session) => session.skiDistance > max.skiDistance ? session : max, data[0]);
  const maxVerticalDrop = data.reduce((max, session) => session.verticalDrop > max.verticalDrop ? session : max, data[0]);
  const fastestSpeed = data.reduce((max, session) => session.speed > max.speed ? session : max, data[0]);
  const mostRuns = data.reduce((max, session) => session.runs > max.runs ? session : max, data[0]);
  const coldestDay = data.reduce((coldest, session) => session.temperature < coldest.temperature ? session : coldest, data[0]);
  const bestSkiPartner = data.reduce((acc, session) => {
    acc[session.skiPartner] = (acc[session.skiPartner] || 0) + 1;
    return acc;
  }, {});

  const bestSkiPartnerName = Object.keys(bestSkiPartner).reduce((a, b) => bestSkiPartner[a] > bestSkiPartner[b] ? a : b);

  return (
    <div className="">
      <h2>Top Performance</h2>
      <div className='m-3'>
        <div className='container'>
          <div className='row'>
            <div className='col'> 
              <p>Longest Ski Distance: </p>
            </div>
            <div className='col'> 
              {longestSkiDistance.resort}
            </div>
          </div>
          <div className='row'>
            <div className='col'> 
              {longestSkiDistance.skiDistance} 
            </div>
            <div className='col'> 
              {longestSkiDistance.date}
            </div>
          </div>
      </div>

        <p>Max Vertical Drop: {maxVerticalDrop.verticalDrop} m on {maxVerticalDrop.date} at {maxVerticalDrop.resort}</p>
        <p>Fastest Speed: {fastestSpeed.speed} km/h on {fastestSpeed.date} at {fastestSpeed.resort}</p>
        <p>Most Runs in a Day: {mostRuns.runs} on {mostRuns.date} at {mostRuns.resort}</p>
        <p>Coldest Day: {coldestDay.temperature}°C on {coldestDay.date} at {coldestDay.resort}</p>
        <p>Best Ski Partner: {bestSkiPartnerName}</p>
      </div>
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
    <div className="scrollable-pane m-3">
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