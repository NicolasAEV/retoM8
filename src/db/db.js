import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    host: 'localhost',
    database: 'reto-m8',
    port: 5432,
    user: 'postgres',
    password: 'Jasonpia0',
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 2000,
  })
export default pool;