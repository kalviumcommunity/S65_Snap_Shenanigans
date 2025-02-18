// filepath: /c:/Users/jayac/OneDrive/Documents/snap_shenanigans/S65_Snap_Shenanigans/frontend/src/components/SelfieLocation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SelfieLocation({ _id, name, description, imageUrl, fetchLocations }) {
  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/entity/${_id}`)
      .then(response => {
        console.log('Entity deleted successfully:', response.data); // Debug log
        fetchLocations(); // Fetch the latest locations after deleting an entity
      })
      .catch(error => {
        console.error('Error deleting entity:', error);
      });
  };

  return (
    <div className="selfie-location">
      <img src={imageUrl} alt={name} className="selfie-location-image" />
      <h3 className="selfie-location-name">{name}</h3>
      <p className="selfie-location-description">{description}</p>
      <Link to={`/update-entity/${_id}`}>Update</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default SelfieLocation;