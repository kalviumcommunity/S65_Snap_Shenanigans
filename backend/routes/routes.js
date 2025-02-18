const express = require('express');
const router = express.Router();
const Entity = require('../models/entity');


router.post('/entity', async (req, res) => {
  try {
    const entity = new Entity(req.body);
    const result = await entity.save();
    res.status(201).send(result);
  } catch (err) {
    console.error('Error inserting document:', err);
    res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
});

router.get('/entity/:id', async (req, res) => {
  try {
    const result = await Entity.findById(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    console.error('Error finding document:', err);
    res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/entity/:id', async (req, res) => {
  try {
    const result = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(result);
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
});

router.delete('/entity/:id', async (req, res) => {
  try {
    const result = await Entity.findByIdAndDelete(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;