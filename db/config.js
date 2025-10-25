const { Trino, BasicAuth } = require('trino-client');

let USERNAME = process.env.USERNAME;
let PASSWORD = process.env.PASSWORD;
let TRINO_SERVER = process.env.TRINO_SERVER;

// Middleware for running a Trino query
async function trinoQueryMiddleware(req, res, next) {
    try {
        const { query} = req.body;
        if (!query) {
            return res.status(400).json({ success: false, message: 'No query provided' });
        }
        const trino = Trino.create({
            server: TRINO_SERVER,
            catalog: 'memory',
            schema: 'default',
            auth: new BasicAuth(USERNAME, PASSWORD),
        });
        const iter = await trino.query({ query });
        let results = [];
        for await (const queryResult of iter) {
            results.push(queryResult.data);
        }
        req.trinoResult = results;
        console.log('Trino query results:', results);
        next();
    } catch (error) {
        console.error('Error executing Trino query:', error);
        res.status(500).json({ success: false, message: 'Trino query failed', error: error.message });
    }
}

module.exports = { trinoQueryMiddleware };




// const { Trino, BasicAuth } = require('trino-client');

// let USERNAME = process.env.USERNAME;
// let PASSWORD = process.env.PASSWORD;
// let TRINO_SERVER = process.env.TRINO_SERVER;

// // Middleware for running a Trino query
// async function trinoQueryMiddleware(req, res, next) {
//     try {
//         const { query, ...options } = req.body;
//         if (!query) {
//             return res.status(400).json({ success: false, message: 'No query provided' });
//         }
//         const trino = Trino.create({
//             server: TRINO_SERVER,
//             catalog: 'memory',
//             schema: 'default',
//             auth: new BasicAuth(USERNAME, PASSWORD),
//         });
//         const iter = await trino.query({ query, ...options });
//         let results = [];
//         for await (const queryResult of iter) {
//             results.push(queryResult.data);
//         }
//         req.trinoResult = results;
//         console.log('Trino query results:', results);
//         next();
//     } catch (error) {
//         console.error('Error executing Trino query:', error);
//         res.status(500).json({ success: false, message: 'Trino query failed', error: error.message });
//     }
// }

// module.exports = { trinoQueryMiddleware };
