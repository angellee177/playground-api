const express = require('express')
    , router = express.Router()
    , productRoutes = require('./products.route')
    , categoryRoutes = require('./categories.route');

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
