import React from 'react';
import SelfieLocation from './selfielocation';

function SelfieLocations({ locations, fetchLocations }) {
  console.log('Locations in SelfieLocations:', locations);

  if (!locations || locations.length === 0) {
    return <p>No selfie locations available.</p>;
  }

  const featuredLocations = locations.slice(0, 3);

  return (
    <div>
      <h2>Featured Selfie Locations</h2>
      {featuredLocations.map(location => (
        <SelfieLocation key={location._id} {...location} fetchLocations={fetchLocations} />
      ))}
    </div>
  );
}

export default SelfieLocations;