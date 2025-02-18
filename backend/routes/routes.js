const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Entity = require('../models/entity');

router.post('/entity', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('imageUrl').isURL().withMessage('Image URL must be a valid URL'),
  body('created_by').notEmpty().withMessage('Created by is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const entity = new Entity(req.body);
    const result = await entity.save();
    res.status(201).send(result);
  } catch (err) {
    console.error('Error inserting document:', err);
    res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
});

router.get('/entity', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).send(entities);
  } catch (err) {
    console.error('Error fetching entities:', err);
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

router.put('/entity/:id', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('imageUrl').isURL().withMessage('Image URL must be a valid URL')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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