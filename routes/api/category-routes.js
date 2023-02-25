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
  const { category_name } = req.body;
  if (!category_name) {
    res.status(500).json({message: "Improperly formatted request"});
    return;
  }

  try {
    const newCategory = await Category.create({category_name: category_name});
    
    if (!newCategory) {
      res.status(500).json({message: "Could not create the new category! Please try again later!"});
      return;  
    }
    res.status(200).json(newCategory);

  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { category_name } = req.body;
  if (!category_name) {
    res.status(500).json({message: "Improperly formatted request"});
    return;
  }

  try {
    const categoryExists = await Category.findByPk(req.params.id);
    if (!categoryExists) {
      return res.status(404).json({message: `No category with id: ${req.params.id} found!`});
    }
    const categoryData = await Category.update({
      category_name: category_name
    }, 
    {
      where: {
        id: req.params.id
      }
    });
    
    if (categoryData[0] === 0) {
      return res.status(200).json({message: `Category already updated!`});  
    }
    res.status(200).json(categoryData);

  } catch (err) {
    return res.status(500).json({message: "Could not update the category! Please try again later!"});
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCategory) {
      res.status(404).json({message: `No category with id: ${req.params.id} found!`});
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
