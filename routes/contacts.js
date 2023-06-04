// routes/contacts.js
const express = require('express');
const router = express();
const contactController = require('../controllers/contactController');

// Create a route for adding a contact
router.post('/contacts', contactController.addContact);

// Create a route for getting all contacts
router.get('/contacts/byUser/:id', contactController.getAllContacts);

// Create a route for getting a contact by its ID
router.get('/contacts/:id', contactController.getContactById);

// Create a route for updating a contact
router.put('/contacts/:id', contactController.updateContact);

// Create a route for deleting a contact
router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
