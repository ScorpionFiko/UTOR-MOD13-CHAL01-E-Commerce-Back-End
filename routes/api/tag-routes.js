const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  // find all tags and their associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }]
    });
    if (!tagData) {
      return res.status(404).json({ message: "No data found!" });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` and its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }]
    });
    if (!tagData) {
      return res.status(404).json({ message: `No tag data found for tag id: ${req.params.id}!` });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  if (!tag_name) {
    return res.status(500).json({ message: `Improperly formatted request` });
  }
  try {
    const tagData = await Tag.create({
      tag_name: tag_name
    });
    if (!tagData) {
      return res.status(500).json({message: "Unable to create new Tag! Please try again later!"});
    }
    return res.status(200).json(tagData);
  } catch (err) {
    return res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body;
  if (!tag_name) {
    return res.status(500).json({ message: `Improperly formatted request` });
  }
  try {
    // update funcitonality does not distinguish between id not found and no updates made to the tag. In both cases, the return is [0]. To be more specific, before update, findByPK is used to determine if the tag exist; otherwise it throws 404 error; 
    // if the tag exists, it attempts an update and if return is [0], the message "Data already updated to selected values" is returned
    const tagExists = await Tag.findByPk(req.params.id);
    if (!tagExists) {
      return res.status(404).json({message: `No data found for Tag id: ${req.params.id}!`});
    }
    const tagData = await Tag.update({
      tag_name: tag_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    if (tagData[0] === 0) {
      return res.status(200).json({message: `Tag id: ${req.params.id} already updated to selected values!`});
    }
    return res.status(200).json(tagData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      return res.status(404).json({ message: `No data found for tag id: ${req.params.id}!` });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
