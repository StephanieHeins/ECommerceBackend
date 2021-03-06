const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Find ALL products 
router.get('/', async (req, res) => {
  try {
    const dbProductData = await Product.findAll({
      // Include associated Product Model
      include: [
        { 
          model: Category,
          attributes: ["category_name"]
        }, {
          model: Tag,
          attributes: ["tag_name"]
        } 
      ]
    });
    // Return OK Status and dbProductData
    res.status(200).json(dbProductData);
  // Error catch & 500 status 
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get ONE product by `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Category and Tag data
  try {
    const dbProductData = await Product.findByPk(req.params.id, {
      include: [
        { 
          model: Category,
          attributes: ["category_name"]
        }, {
          model: Tag,
          attributes: ["tag_name"]
        } 
      ]
    });
    // 404 status if ID not found 
    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with given ID' });
      return;
    }
    // Return OK Status and dbProductData
    res.status(200).json(dbProductData);
    // Error catch & 500 status
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new product 
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tagIds
  })
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE product data
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// DELETE product by `id` 
router.delete('/:id', async (req, res) => {
    try {
      const dbProductData = await Product.destroy({
        where: { id: req.params.id }
      });
      // 404 status if ID not found 
      if (!dbProductData) {
        res.status(404).json({ message: 'No Product with this id!' });
        return;
      }
      // Return OK Status and dbProductData
      res.status(200).json(dbProductData);
    // Error catch & 500 status 
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
