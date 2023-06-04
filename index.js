// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db/connectdb');
const app = express();

//Routes
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Connect to the MongoDB
db.connect()
    .then(() => {
        console.log('Connected to MongoDB: ' + Date.now().toString());
    })
    .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use(contactRoutes, userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
