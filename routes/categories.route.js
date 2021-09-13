const express = require('express')
    , router = express.Router()
    , CategoryController = require('../controllers/categoryControllers')
    , Validator = require('../validators/categoryForm');

router.post(
    '/new',
    [
        Validator.validateCategoryForm
    ],
    CategoryController.create
);

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);

module.exports = router;
