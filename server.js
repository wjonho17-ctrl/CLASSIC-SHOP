const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/classic-shop?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

// Schemas
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    variants: [String],
    imgs: [String],
    createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
    customer_name: String,
    address: String,
    items: [{
        id: Number,
        name: String,
        price: Number,
        chosenSize: String,
        quantity: Number,
        image: String
    }],
    total: Number,
    status: { type: String, default: 'Pending' },
    date: String,
    createdAt: { type: Date, default: Date.now }
});

// Rental listing schema
const rentalSchema = new mongoose.Schema({
    title: String,
    location: String,
    address: String,
    price: Number,
    rooms: Number,
    photos: [String],
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Rental = mongoose.model('Rental', rentalSchema);

// Routes

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a product
app.post('/api/products', async (req, res) => {
    try {
        const { name, price, category, variants, imgs } = req.body;
        const product = new Product({ name, price, category, variants, imgs });
        const savedProduct = await product.save();
        res.json({ id: savedProduct._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.json({ deleted: result ? 1 : 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rental endpoints
app.get('/api/rentals', async (req, res) => {
    try {
        const rentals = await Rental.find();
        res.json(rentals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/rentals', async (req, res) => {
    try {
        const { title, location, address, price, rooms, photos } = req.body;
        const rental = new Rental({ title, location, address, price, rooms, photos });
        const saved = await rental.save();
        res.json({ id: saved._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/rentals/:id', async (req, res) => {
    try {
        const result = await Rental.findByIdAndDelete(req.params.id);
        res.json({ deleted: result ? 1 : 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add an order
app.post('/api/orders', async (req, res) => {
    try {
        const { customer_name, address, items, total, date, status } = req.body;
        const order = new Order({ customer_name, address, items, total, date, status });
        const savedOrder = await order.save();
        res.json({ id: savedOrder._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});