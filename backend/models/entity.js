const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;