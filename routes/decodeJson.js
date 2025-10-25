const express = require('express');
const { trinoQueryMiddleware } = require('../db/config.js');
const Router = express.Router();

// Accepts either jsonString or query in the body
Router.post('/decode-json', trinoQueryMiddleware, async (req, res) => {
    try {
        const { query } = req.body;
        console.log('Received jsonString:', query);
        let parsedData;
        if (query) {
            parsedData = JSON.parse(query);
            console.log('Decoded JSON:', parsedData);
            res.status(200).json({ success: true, data: req.trinoResult });
        }  else {
            throw new Error('No jsonString or query provided');
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid input', error: error.message });
    }
});

module.exports = Router;


// const express = require('express');
// const { trinoQueryMiddleware } = require('../db/config.js');
// const Router = express.Router();

// // Accepts either jsonString or query in the body
// Router.post('/decode-json', trinoQueryMiddleware, async (req, res) => {
//     try {
//         const { jsonString, query } = req.body;
//         console.log('Received jsonString:', query);
//         let parsedData;
//         if (jsonString) {
//             parsedData = JSON.parse(jsonString);
//             console.log('Decoded JSON:', parsedData);
//             res.status(200).json({ success: true, data: parsedData });
//         } else if (query) {
//             // If query, return Trino result from middleware
//             res.status(200).json({ success: true, data: req.trinoResult });
//         } else {
//             throw new Error('No jsonString or query provided');
//         }
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Invalid input', error: error.message });
//     }
// });

// module.exports = Router;