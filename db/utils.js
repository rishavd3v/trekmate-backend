require("dotenv").config();
const { Client } = require("pg");

async function getClient() {
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  console.log("Connected to database");
  return client;
}

module.exports = { getClient };
