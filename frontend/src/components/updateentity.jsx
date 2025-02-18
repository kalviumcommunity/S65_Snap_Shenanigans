import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './entityform.css';
import { useParams } from 'react-router-dom';

function UpdateEntityForm({ fetchLocations }) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/entity/${id}`)
      .then(response => {
        const entity = response.data;
        setName(entity.name);
        setDescription(entity.description);
        setImageUrl(entity.imageUrl);
      })
      .catch(error => {
        console.error('Error fetching entity:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEntity = { name, description, imageUrl };
    console.log('Updating entity:', updatedEntity);
    axios.put(`http://localhost:3000/api/entity/${id}`, updatedEntity)
      .then(response => {
        console.log('Entity updated successfully:', response.data);
        fetchLocations();
      })
      .catch(error => {
        console.error('Error updating entity:', error);
      });
  };

  return (
    <form className="add-entity-form" onSubmit={handleSubmit}>
      <h2>Update Selfie Location</h2>
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
      <button type="submit">Update Location</button>
    </form>
  );
}

export default UpdateEntityForm;