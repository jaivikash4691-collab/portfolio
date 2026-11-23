const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function initDatabase() {
  console.log('--- Initializing MySQL Portfolio Database ---');
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 3306,
    multipleStatements: true
  };

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log(`[1/3] Connected to MySQL server at ${dbConfig.host}:${dbConfig.port}`);

    const dbName = process.env.DB_NAME || 'portfolio_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`[2/3] Database '${dbName}' created or already exists.`);

    await connection.query(`USE \`${dbName}\`;`);

    // Read schema.sql
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(schemaSql);
      console.log(`[3/3] Executed schema.sql successfully.`);
    }

    // Read seed.sql
    const seedPath = path.join(__dirname, '../../database/seed.sql');
    if (fs.existsSync(seedPath)) {
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      await connection.query(seedSql);
      console.log(`[Done] Seed data inserted successfully.`);
    }

    console.log('\x1b[32m%s\x1b[0m', '✓ MySQL Database initialization completed successfully!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Failed to initialize MySQL database: ${error.message}`);
    console.info('Ensure your MySQL service is running and credentials in .env are correct.');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;

