import React from 'react';
import { Link } from 'react-router-dom';

export function GenerateCard(props){
  const {resortData} = props;

  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
    <div className="card">
        <img src={resortData.img} className="card-img-top" alt= {resortData.Name}/>
        <div className="card-body">
            <h5 className="card-title">{resortData.Name}</h5>
            <p className="card-text">{resortData.State}</p>
            <Link to={`/index/${resortData.Name}`} className="btn btn-info">
              View More
            </Link>
        </div>
    </div>
</div>
  );
}