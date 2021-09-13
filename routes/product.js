const ProductController = require('../controllers/productControllers');
const express = require('express');
const routes = express.Router();

routes.get('/', ProductController.getProducts);
routes.post('/new', ProductController.create);
routes.get('/:id', ProductController.getProductById);
routes.delete('/:productId', ProductController.deleteProductById);
routes.put("/:productId", ProductController.updateProductById);


module.exports = routes;
