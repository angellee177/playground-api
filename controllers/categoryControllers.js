const Categories = require('../category.json')
    , fs = require('fs')
    , { isValidCategory, isValidCategories } = require('../validators/custom/categories');

/**
 * Get Categories
 * 
 */
const getCategories = (req, res) => {
    if(!Categories || Categories.length <= 0) {
        return res.status(404).json({ success: { status: false, message: "There is no data in Category" }, data: null });
    };

    return res.status(200).json({ success: { status: true, message: "success" }, data: Categories });
};

/**
 * Create new Category
 * 
 */
const create = (req, res) => {
    const { name = null } 
};

/**
 * Get Category By id
 * 
 */
const getCategoryById = (req, res) => {
    const { id = null } = req.params;
    
    try {
        const category = isValidCategories(id);

        return res.status(200).json({ success: { status: true, message: 'success' }, data: category });
    } catch(e) {
        return res.status(404).json({ success: { status: false, message: e.message }, data: null });
    }
};

module.exports = { getCategories, create, getCategoryById };
