// routes/contacts.js
const express = require('express');
const router = express();
const userController = require('../controllers/userController');

// Create a route for adding a contact
router.post('/users', userController.adduser);

// Create a route for getting all contacts
router.get('/users', userController.getAllUsers);

// Create a route for getting a contact by its ID
router.get('/users/:id', userController.getUserById);

// Create a route for updating a contact
router.put('/users/:id', userController.updateUser);

// Create a route for deleting a contact
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
