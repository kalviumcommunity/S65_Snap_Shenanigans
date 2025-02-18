import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Features from './components/features';
import SelfieLocations from './components/selfielocation';
import AddEntityForm from './components/entityform';
import UpdateEntityForm from './components/updateentity';
import ErrorBoundary from './components/error';
import axios from 'axios';

function App() {
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const fetchLocations = () => {
    axios.get('http://localhost:3000/api/entity')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchUsers = () => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const fetchLocationsByUser = (userId) => {
    axios.get(`http://localhost:3000/api/entity/user/${userId}`)
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchLocations();
    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    if (userId) {
      fetchLocationsByUser(userId);
    } else {
      fetchLocations();
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Snap Shenanigans</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/selfie-locations">Selfie Locations</Link></li>
              <li><Link to="/add-entity">Add Entity</Link></li>
            </ul>
          </nav>
        </header>
        <div>
          <label htmlFor="user-select">Filter by User:</label>
          <select id="user-select" value={selectedUser} onChange={handleUserChange}>
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/selfie-locations" element={
            <ErrorBoundary>
              <SelfieLocations locations={locations} fetchLocations={fetchLocations} />
            </ErrorBoundary>
          } />
          <Route path="/add-entity" element={<AddEntityForm fetchLocations={fetchLocations} />} />
          <Route path="/update-entity/:id" element={<UpdateEntityForm fetchLocations={fetchLocations} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;