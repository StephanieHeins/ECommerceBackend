const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// router.get('/', (req, res) => {

//Find ALL categories 
  router.get('/', async (req, res) => {
    try {
      const dbCategoryData = await Category.findAll({
        include: [{ model: Product }]
      });
      // Return OK Status and dbCategoryData
      res.status(200).json(dbCategoryData);
    // Error catch & 500 status 
    } catch (err) {
      res.status(500).json(err);
    }
  });

  /*
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbCategoryData => {
      if(!dbCategoryData) {
        res.status(404).json({message: 'Category not found'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});
*/

// Find ONE Category by its `id` value 
router.get('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }]
    });
    // 404 status if ID not found 
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with given ID' });
      return;
    }
    // Return OK Status and dbCategoryData
    res.status(200).json(dbCategoryData);
    // Error catch & 500 status 
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new category
router.post('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name
    })
    // Return OK Status and dbCategoryData
    res.status(200).json(dbCategoryData);
    // Error catch & 400 status 
    } catch (err) {
      res.status(400).json(err);
    }
});

// UPDATE category by `id`
router.put('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id 
      }
    });
    // 404 status if ID not found 
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with given ID' });
      return;
    }
    // Return OK Status and dbCategoryData
    res.status(200).json(dbCategoryData);  
  // Error catch & 500 status
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE category by `id` 
router.delete('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.destroy({
      where: { id: req.params.id }
    })
    // 404 status if ID not found 
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No Category found with given ID' });
      return;
    }
    // Return OK Status and dbCategoryData
    res.status(200).json(dbCategoryData);
  // Error catch & 500 status
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
