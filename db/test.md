const TrinoClient = require('presto-client').Client;
const client = new TrinoClient({
host: 'localhost',
port: 8080,
user: 'openai_user', // simple username
catalog: 'memory',
schema: 'default',
});

async function runTrinoQuery() {
try {
const data = await client.query({
query: "SELECT \* FROM memory.default.openai_users LIMIT 10",
});
console.log('Query results:', data);
} catch (error) {
console.error('Error executing Trino query:', error);
}
}

// Lightweight connection test you can call to notify success/failure
async function testConnection() {
try {
// a small inexpensive query to validate the connection
await client.query({ query: 'SELECT 1' });
console.log('Trino connection successful');
return true;
} catch (error) {
console.error('Trino connection failed:', error);
return false;
}
}

// runTrinoQuery();
module.exports = { connect: client, testConnection, runTrinoQuery };
