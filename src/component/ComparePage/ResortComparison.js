import React, { useState } from 'react';
import resourcedata from '../../data/resourcedata.json';

function ResortComparison() {
    const [resort1Value, setResort1Value] = useState('');
    const [resort2Value, setResort2Value] = useState('');
    
    const [target1Value, setClicked1Data] = useState(null);
    const [image1Path, setImage1Path] = useState('img/ski.jpg');
    const [warning1Value, setWarning1Data] = useState(false);

    const [target2Value, setClicked2Data] = useState(null);
    const [image2Path, setImage2Path] = useState('img/ski.jpg');
    const [warning2Value, setWarning2Data] = useState(false);

    const handleResort1Change = (event) => {
        setResort1Value(event.target.value);
    };

    const handleResort2Change = (event) => {
        setResort2Value(event.target.value);
    };

    const handleButtonClick1 = () => {
        const target = resourcedata.find(item => item.Name.toLowerCase() === resort1Value.toLowerCase());
        if (target) {
            setClicked1Data(target);
            setImage1Path(target.img);
            setWarning1Data(false);
        } else {
            setClicked1Data(null);
            setImage1Path('img/ski.jpg');
            setWarning1Data(true);
        }
    };

    const handleButtonClick2 = () => {
        const target = resourcedata.find(item => item.Name.toLowerCase() === resort2Value.toLowerCase());
        if (target) {
            setClicked2Data(target);
            setImage2Path(target.img);
            setWarning2Data(false);
        } else {
            setClicked2Data(null);
            setImage2Path('img/ski.jpg');
            setWarning2Data(true);
        }
    };

    const renderResortInfo = (data, imagePath, warning) => (
        <div className="resort-card mx-2">
            <img src={imagePath} alt={`Image of ${data ? data.Name : 'Resort'}`} className="resort-image"/>
            <div className="resort-info">
                {data ? (
                    <>
                        <h2>{data.Name}</h2>
                        <p>State: {data.State}</p>
                        <p>Price: ${data.Price}</p>
                        <p>Number of Slopes: {data['Number of Slopes']}</p>
                        <p>Description: {data.Description}</p>
                        <p>Company: {data.Company}</p>
                    </>
                ) : (
                    warning ? <p>No data available.</p> : (
                        <>
                            <h2>Resort Name</h2>
                            <p>State: </p>
                            <p>Price: $</p>
                            <p>Number of Slopes:</p>
                            <p>Description:</p>
                            <p>Company:</p>
                        </>
                    )
                )}
            </div>
        </div>
    );

    return (
        <div>
            <div className="compare-container">
                <div className="search-container">
                    <input type="text" value={resort1Value} onChange={handleResort1Change} placeholder="Select Resort 1" className="search-input"/>
                    <button onClick={handleButtonClick1} className="search-button">Find Resort</button>
                    {renderResortInfo(target1Value, image1Path, warning1Value)}
                </div>
                <div className="search-container">
                    <input type="text" value={resort2Value} onChange={handleResort2Change} placeholder="Select Resort 2" className="search-input"/>
                    <button onClick={handleButtonClick2} className="search-button">Find Resort</button>
                    {renderResortInfo(target2Value, image2Path, warning2Value)}
                </div>
            </div>
        </div>
    );
}

export { ResortComparison };
