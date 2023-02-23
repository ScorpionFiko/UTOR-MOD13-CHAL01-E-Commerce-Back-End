const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories and associated Products
  try {
    const categoryData = await Category.findAll({
        include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category data found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` and its associated PRoducts
  try {
    const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: `No category with id: ${req.params.id} found!` });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { categoryName } = req.body;
  if (!categoryName) {
    res.status(500).json({message: "Improperly formatted request"});
    return;
  }

  try {
    const newCategory = await Category.create({category_name: categoryName});
    
    if (!newCategory) {
      res.status(500).json({message: "Could not create the new category! Please try again later!"});
      return;  
    }
    res.status(200).json(newCategory);

  } catch (err) {
    res.status(500).json({message: "Could not create the new category! Please try again later!"});
    return;
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
