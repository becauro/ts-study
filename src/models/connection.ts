import mysql from 'mysql2/promise';

let host: any = process.env.DB_HOSTNAME;
let user: any = process.env.DB_USER;
let port: any = process.env.DB_PORT;
let password: any = process.env.DB_PASSWORD ;
let database: any = process.env.DB_DATABASE;


export const poolcreator: any = mysql.createPool({
  host,
  user,
  port,
  password,
  database,
});


