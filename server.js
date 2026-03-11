const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Database setup
const db = new sqlite3.Database('./shop.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        createTables();
    }
});

// Create tables
function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT,
        variants TEXT,
        imgs TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        items TEXT,
        total REAL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

// Routes

// Get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        rows.forEach(row => {
            row.variants = JSON.parse(row.variants || '[]');
            row.imgs = JSON.parse(row.imgs || '[]');
        });
        res.json(rows);
    });
});

// Add a product
app.post('/api/products', (req, res) => {
    const { name, price, category, variants, imgs } = req.body;
    const variantsStr = JSON.stringify(variants);
    const imgsStr = JSON.stringify(imgs);
    db.run('INSERT INTO products (name, price, category, variants, imgs) VALUES (?, ?, ?, ?, ?)',
        [name, price, category, variantsStr, imgsStr], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deleted: this.changes });
    });
});

// Get all orders
app.get('/api/orders', (req, res) => {
    db.all('SELECT * FROM orders', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        rows.forEach(row => {
            row.items = JSON.parse(row.items || '[]');
        });
        res.json(rows);
    });
});

// Add an order
app.post('/api/orders', (req, res) => {
    const { customer_name, items, total } = req.body;
    const itemsStr = JSON.stringify(items);
    db.run('INSERT INTO orders (customer_name, items, total) VALUES (?, ?, ?)',
        [customer_name, itemsStr, total], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});