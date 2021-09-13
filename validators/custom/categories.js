const Categories = require('../../category.json')
    , { get } = require('lodash');

/**
 * Check if Category is valid
 * @param {String} id category id
 * @returns {Object}
 */
const isValidCategories = (id) => {
    const category = Categories.filter((val) => val ? val['id'] === Number(id) : null);

    const getCategory = get(category, '0', null);

    if(!getCategory) {
        throw new Error('Category is not valid');
    };

    return getCategory;
};

module.exports = { isValidCategories };

