'use strict';

/**
 * Catch All
 */
server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
});

/**
 * Routes
 */
require('./barcode_register');
require('./brand');
require('./class');
require('./companyinfo');
require('./customer');
require('./delivery_order');
require('./film');
require('./grade');
require('./inv_onhand');
require('./menu');
require('./organization');
require('./product');
require('./role');
require('./user');
