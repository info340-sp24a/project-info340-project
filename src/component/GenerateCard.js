import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function GenerateCard({ resortData }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <Card>
        <Card.Img variant="top" src={resortData.resortImage} alt={resortData.resortName} />
        <Card.Body>
          <Card.Title>{resortData.resortName}</Card.Title>
          <Card.Text>{resortData.state}</Card.Text>
          <Link to={`/index/${resortData.firebaseKey}`}>
            <Button variant="info">View More</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}