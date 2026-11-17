import { Pool } from "pg";
import { configDotenv } from "dotenv";

configDotenv();

const pool: Pool = new Pool({
  database: process.env.BD_POSTGRE,
  user: process.env.USER_Postgre,
  password: process.env.PASS_BD_POST,
  port: Number(process.env.PORT_POST) || 5432,
  host:process.env.HOST_POST,
  ssl: false,
  max: 20, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 5000, 
  maxUses: 7500,
});


export default pool;