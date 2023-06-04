const { ObjectId } = require('mongodb');
const client = require('../db/connectdb');
const collection = client.db().collection('contacts');
const contactSchema = require('../models/contactModel');

// Validate contact against the schema
const validateContact = (contact) => {
    for (const field in contactSchema) {
        const { required, type } = contactSchema[field];
        const fieldValue = contact[field];

        if (required && (!fieldValue || typeof fieldValue !== type)) {
            return `Invalid value for field '${field}'`;
        }

        if (!required && fieldValue !== null && fieldValue !== undefined && typeof fieldValue !== type) {
            return `Invalid value for field '${field}'`;
        }
    }

    return true;
};

// Controller for adding a contact
exports.addContact = async (req, res) => {
    try {
        const contact = req.body;
        const validationError = validateContact(contact);

        if (validationError !== true) {
            res.status(400).send({ message: validationError });
            return;
        }

        const result = await collection.insertOne(contact);
        res.status(201).send({ message: 'Contact added successfully', id: result.insertedId });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error adding contact', error: err });
    }
};

// Controller for getting all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const userid = req.params.id;
        const contacts = await collection.find({ addedBy: userid }).toArray();
        res.status(200).send({ message: 'Contacts retrieved successfully', contacts });
    } catch (err) {
        res.status(500).send({ message: 'Error getting contacts', error: err });
    }
};

// Controller for getting a contact by its ID
exports.getContactById = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = await collection.findOne({ _id: new ObjectId(contactId) });
        res.status(200).send({ message: 'Contact retrieved successfully', contact });
    } catch (err) {
        res.status(500).send({ message: 'Error getting contact', error: err });
    }
};

// Controller for updating a contact
exports.updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = req.body;
        const validationError = validateContact(contact);

        if (validationError !== true) {
            res.status(400).send({ message: validationError });
            return;
        }

        await collection.updateOne({ _id: new ObjectId(contactId) }, { $set: contact });
        res.status(200).send({ message: 'Contact updated successfully', contact });
    } catch (err) {
        res.status(500).send({ message: 'Error updating contact', error: err });
    }
};

// Controller for deleting a contact
exports.deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        await collection.deleteOne({ _id: new ObjectId(contactId) });
        res.status(200).send({ message: 'Contact deleted successfully', status: true, id: contactId });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting contact', error: err });
    }
};