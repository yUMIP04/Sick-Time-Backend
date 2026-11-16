import { Pool } from "pg";
import { configDotenv } from "dotenv";

const pool: Pool = new Pool();
configDotenv();

const pool2 = new Pool({
     database: process.env.BD_POSTGRE,
  user: 'brianc',
  password: 'secret!',
  port: 5432,
  ssl: true,
  max: 20, 
  idleTimeoutMillis: 1000, 
  connectionTimeoutMillis: 1000, 
  maxUses: 7500,
})