const { body, query } = require('express-validator');
const FieldValidationMessage = require('./helper/fieldValidationMessage');
// const CategoryValidator = require('./custom/categories');


const validateCategoryForm = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage(FieldValidationMessage('required', 'name'))
];

module.exports = { validateCategoryForm };
