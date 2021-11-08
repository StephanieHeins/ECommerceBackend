const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find ALL tags 
router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const dbTagData = await Tag.findAll({
      include: [{ model: Product, ProductTag }]
    });
    // Return OK Status and dbTagData
    res.status(200).json(dbTagData);
  // Error catch & 500 status 
  } catch (err) {
    res.status(500).json(err);
  }
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
