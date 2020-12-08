const express = require('express');

const router = express.Router();

module.exports = function(io) {


    router.post('/:id', (req, res) => {


        console.log("BODY", req.body)

        console.log("ID", req.params.id)
        
    })

    return router


    


}