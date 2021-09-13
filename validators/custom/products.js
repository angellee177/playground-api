const Products = require('../../product.json')
    , { get } = require('lodash')

/**
 * Check if Product is valid
 * @param {String} id product id
 * @returns {Object}
 */
const isValidProduct = (id) => {    
    const product = Products.filter((val) => val ? val['id'] === Number(id) : null);

    const getProduct = get(product, '0', null);

    if(!getProduct) {
       throw new Error("Product is not valid");
    }

    return getProduct;
};

module.exports = { isValidProduct }
