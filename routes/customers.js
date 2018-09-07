const express = require('express');
const router = express.Router();

const queries = require('../customerQueries');

router.get("/", (request, response, next) => {
    queries.list().then(customer => {
        response.json({customer});
    }).catch(next);
});

module.exports = router;