require('dotenv').config();

const server = require('./api/server.js');

const { PORT } = process.env;

const port = PORT;

server.listen(port, () => console.log(`\n== API running on port ${port} ==\n`));
