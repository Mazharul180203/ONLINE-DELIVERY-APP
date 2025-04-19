import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database:'odapp'
})



pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database successfully');
    release();
});


export {pool}