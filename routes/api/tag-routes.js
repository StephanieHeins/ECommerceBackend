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
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const dbTagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, ProductTag }]
    });
    // 404 status if ID not found
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag foud with given ID' });
      return;
    }
    // Return OK Status and dbTagData
    res.status(200).json(dbTagData);
    // Error catch & 500 status 
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new tag 
router.post('/', async (req, res) => {
  try {
  const dbTagData = await Tag.create(req.body);
  // Return OK Status and dbTagData
  res.status(200).json(dbTagData);
  // Error catch & 400 status 
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE tag name by its `id`
router.put('/:id', (req, res) => {
  try {
    const dbTagData = await Tag.update(req.body, {
      where: {id: req.params.id }
    });
    // 404 status if ID not found
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag foud with given ID' });
      return;
    }
    // Return OK Status and dbTagData
    res.status(200).json(dbTagData);  
  // Error catch & 500 status 
  } catch (err) {
    res.status(500).json(err);
  }

});

// DELETE tag by its `id`
router.delete('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    // 404 status if ID not found
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag foud with given ID' });
      return;
    }
    // Return OK Status and dbTagData
    res.status(200).json(dbTagData);
  // Error catch & 500 status 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
