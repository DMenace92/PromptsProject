const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db/config');
const decodeJsonRoute = require('./routes/decodeJson');
// const runTrinoQuery = require('./db/config')
const PORT = process.env.PORT || 9000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(decodeJsonRoute);
// Removed app.use(runTrinoQuery) because runTrinoQuery is not an Express middleware
// app.use('/trino-query', runTrinoQuery.trinoQueryMiddleware);

app.listen(PORT, (err) => {
    if(err){
        throw err;
    }
    console.log(`Server is running on port ${PORT}`);
});
