import React, { useState } from 'react';
import axios from 'axios';
import './entityform.css';

function AddEntityForm({ fetchLocations }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntity = { name, description, imageUrl };
    console.log('Submitting new entity:', newEntity);
    axios.post('http://localhost:3000/api/entity', newEntity)
      .then(response => {
        console.log('Entity added successfully:', response.data);
        setName('');
        setDescription('');
        setImageUrl('');
        fetchLocations();
      })
      .catch(error => {
        console.error('Error adding entity:', error);
      });
  };

  return (
    <form className="add-entity-form" onSubmit={handleSubmit}>
      <h2>Add a New Selfie Location</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      </div>
      <button type="submit">Add Location</button>
    </form>
  );
}

export default AddEntityForm;