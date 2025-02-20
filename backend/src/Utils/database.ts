import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool for the database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '#BMWrootsql@010',
    database: process.env.DB_NAME || 'sadb2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test the database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database');
        connection.release();  
    } catch (err: any) {
        console.error('Database connection failed:', err.message);
        process.exit(1); 
    }
})();






import { Pool } from 'mysql2/promise';



// const query = async <T>(sql: string, values: any[] = []): Promise<T[]> => {
//     try {
//         const [results] = await pool.query(sql, values); // Type inference for query results
//         return results as T[]; // Explicitly cast to T[] to satisfy TypeScript
//     } catch (err: any) {
//         console.error('Error executing query:', err.message);
//         throw err; // Propagate the error if the query fails
//     }
// };





import { RowDataPacket } from 'mysql2'; 

// Define a generic query function to type the result
 const query = async <T>(sql: string, values: any[] = []): Promise<T[]> => {
  try {
    const [results] = await pool.query<RowDataPacket[]>(sql, values);
    return results as T[];
  } catch (err:any) {
    console.error('Error executing query:', err.message);
    throw err;
  }
};






// Function to execute a stored procedure with parameters
const executeStoredProcedure = async (procName: string, params: any[] = []) => {
    try {
        const placeholders = params.map(() => '?').join(', '); // Prepare placeholders for parameters
        const sql = `CALL ${procName}(${placeholders})`; // Construct the SQL query for the stored procedure
        const [results] = await pool.query(sql, params); // Execute the stored procedure
        return results; // Return the results from the stored procedure
    } catch (err: any) {
        console.error(`Error executing stored procedure ${procName}:`, err.message);
        throw err; // Propagate the error if the stored procedure fails
    }
};

// Gracefully close the database connection pool on shutdown
process.on('SIGINT', async () => {
    await pool.end(); // Close all active connections in the pool
    console.log('Database connection pool closed');
    process.exit(0); // Exit the process gracefully
});

export { query, executeStoredProcedure, pool };



