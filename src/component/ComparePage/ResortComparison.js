import React from 'react';

function ResortComparison(resort) {
    return (
        <div>
            <div className="compare-container mt-5">
                {/* Resort 1 Column */}
                <div className="resort-compare">
                    <div className="search">
                        <label htmlFor="resort1">Select Resort 1:</label>
                        <input type="text" id="resort1" placeholder="Select Resort 1" className="resort-input mb-2"/>
                        <button className="search-button">Find Resort</button>
                    </div>

                    <div className="resort-card mx-2">
                        <img src="img/ski.jpg" alt="Placeholder for Resort 2" className="resort-image"/>
                        <div className="resort-info">
                            <h2>Resort Name 1</h2>
                            <p>State: {resort.State}</p>
                            <p>Price: ${resort.Price}</p>
                            <p>Number of Slopes: {resort['Number of Slopes']}</p>
                            <p>Description: {resort.Description}</p>
                            <p>Company: {resort.Company}</p>
                            <p>Description: {resort.Description}</p>
                        </div>
                    </div>
                </div>

                {/* Resort 2 Column */}
                <div className="resort-compare">
                    <div className="search">
                        <label htmlFor="resort2">Select Resort 2:</label>
                        <input type="text" id="resort2" placeholder="Select Resort 2" className="resort-input mb-2"/>
                        <button className="search-button">Find Resort</button>
                    </div>

                    <div className="resort-card mx-2">
                        <img src="img/ski.jpg" alt="Placeholder for Resort 2" className="resort-image"/>
                        <div className="resort-info">
                            <h2>Resort Name 1</h2>
                            <p>State: {resort.State}</p>
                            <p>Price: ${resort.Price}</p>
                            <p>Number of Slopes: {resort['Number of Slopes']}</p>
                            <p>Description: {resort.Description}</p>
                            <p>Company: {resort.Company}</p>
                            <p>Description: {resort.Description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    );
}

export {ResortComparison} ;
