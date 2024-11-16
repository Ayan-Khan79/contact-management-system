require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
    user:process.env.DB_USER, 
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD, 
    port:process.env.DB_PORT, 
});

pool.connect();

// Routes
app.get('/', (req, res) => {
    res.send('Contact Management API is running');
});

// Add a new contact
app.post('/contacts', async (req, res) => {
    const { first_name, last_name, email, phone_number, company, job_title } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [first_name, last_name, email, phone_number, company, job_title]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all contacts
app.get('/contacts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contacts');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a contact
app.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, company, job_title } = req.body;
    try {
        const result = await pool.query(
            `UPDATE contacts SET 
                first_name = $1, 
                last_name = $2, 
                email = $3, 
                phone_number = $4, 
                company = $5, 
                job_title = $6 
             WHERE id = $7 RETURNING *`,
            [first_name, last_name, email, phone_number, company, job_title, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a contact
app.delete('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
        res.status(200).send(`Contact with ID ${id} deleted successfully`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
