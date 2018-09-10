const express = require('express');
const router = express.Router();

const queries = require('../customerQueries');

router.get("/", (request, response, next) => {
    queries.list().then(customer => {
        response.json({customer});
    }).catch(next);
});

router.get("/:id", (request, response, next) => {
    queries.read(request.params.id).then(customer => {
        customer
            ? response.json({customer})
            : response.status(404).json({message: 'Not found'})
    }).catch(next);
});

router.post("/", (request, response, next) => {
    queries.create(request.body).then(customer => {
        response.status(201).json({customer});
    }).catch(next);
});

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id).then(() => {
        response.status(204).json({deleted: true})
    }).catch(next);
});

router.put("/:id", (request, response, next) => {
    queries.update(request.params.id, request.body).then(customer => {
        response.json({customer});
    }).catch(next);
});

module.exports = router;