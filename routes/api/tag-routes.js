const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find ALL tags 
router.get('/', (req, res) => {
  // be sure to include its associated Product data

});

// Find ONE tag by `id`
router.get('/:id', (req, res) => {
  // be sure to include its associated Product data

});

// CREATE new tag 
router.post('/', (req, res) => {

});

// UPDATE tag name by its `id`
router.put('/:id', (req, res) => {

});

// DELETE tag by its `id`
router.delete('/:id', (req, res) => {

});

module.exports = router;
