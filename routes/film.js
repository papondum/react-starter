'use strict';

server.get('/film', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    var sql = `
        SELECT
            *

        FROM film
    `;

    db.query(sql, [params.user_id, params.user_id], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // send response to client
        res.send(200, result);
        return next();

    });


});
