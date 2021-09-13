const Products   = require('../product.json')
    , Categories = require('../category.json')
    , fs         = require('fs')
    , { get }    = require('lodash')
    , { isValidProduct } = require('../validators/custom/products');


/**
 * Get Products.
 * 
 */
const getProducts = (req, res) => {
    const result= [];

    Products.forEach((product) => {
        // 1. Find the Category on category.json if the category is valid.
        const category = Categories.filter((val) => val['id'] === product['category']);

        // 2. If category is valid, then assign category that we found as Product[i][category].
        product['category'] = !category ? product[category] : category[0];

        // 3. Add the product into new array.
        result.push(product);
    });


    return res.status(422).json({ success: { status: true, message: 'success' }, data: result });
};


/**
 * Create new Product
 * 
 */
 const create = (req, res) => {
    const { name = "", price = 0, category = null, qty = 0 } = req.body;

    try {
        const newProduct = {
            id: Products.length++,
            name,
            price,
            category,
            qty
        };

        console.log(Products);
        const result = fs.writeFileSync('product.json', JSON.stringify(Products), function(err) {
            if (err){
                err.message = `Product Controller, Create failed: ${err}`;
                throw err;
            };

            console.log('Success insert new Product');
        });
    
        return res.status(200).json({ success: { status: true, message: 'success'}, data: { total: result, Products } });
    } catch(e) {
        return res.status(417).json({ success: { status: false, message: e.message }, data: null });
    }
}

/**
 * Get Product by ID
 * 
 */
const getProductById = (req, res) => {
    const { id = null } = req.params;

    try {
        const product = isValidProduct(id);
    
        return res.status(200).json({ success: { status: true, message: 'success'}, data: product })
    } catch(e) { 
        return res.status(404).json({ success: { status: false, message: e.message }, data: null } );
    }
};

/**
 * Delete Product by ID
 * 
 */
const deleteProductById = (req, res) => {
    const { productId = null } = req.params;
    
    const product = Products.filter((val) => val ? val['id'] !== Number(productId) : {} );

    
    fs.writeFileSync('product.json', JSON.stringify(product), function(err) {
        if (err){
            err.message = `Product Controller, Create failed: ${err}`;
            throw err;
        };
        console.log("Success delete product");
    });

    return res.status(200).json({ success: { status: true, message: 'success'}, data: product  });
};

/**
 * Update product
 */
const updateProductById = (req, res) => {
    const { productId = null } = req.params;
    
    const { name = null, price = 0, category = null, qty = 0 } = req.body;

    try {
        // Find if Product is valid.
        const product = isValidProduct(productId);

        let i = 0;
        while(i < Products.length){
            if(Products[i]['id'] === product['id']) {
                Products[i]['name'] = name ? name : Products[i]['name'];
                Products[i]['price'] = price ? price : Products[i]['price'];
                Products[i]['category'] = category ? category : Products[i]['category'];
                Products[i]['qty'] = qty ? qty : Products[i]['qty'];
            };
            i++;
        }

        return res.status(200).json({ success: { status: true, message: 'success'}, data: Products  });
    } catch(error) {
        res.status(417).json({ success: { status: false, message: error.message }, data: null });
    }
};

module.exports = { 
    getProducts, 
    create, 
    getProductById: getProductById, 
    deleteProductById, 
    updateProductById 
};