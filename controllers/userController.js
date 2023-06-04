const { ObjectId } = require('mongodb');
const client = require('../db/connectdb');
const collection = client.db().collection('users');
const userSchema = require('../models/userModel');

// Validate user against the schema
const validateUser = (user, isPartialUpdate) => {
    for (const field in userSchema) {
        const { required, type } = userSchema[field];
        const fieldValue = user[field];

        if (isPartialUpdate && !fieldValue) {
            continue; // Skip validation for fields not present in the request body during partial update
        }

        if (field === 'emailVerified') {
            // Validate emailVerified as a boolean value
            if (required && typeof fieldValue !== 'boolean') {
                return `Invalid value for field '${field}'`;
            }
        } else {
            // Validate other fields based on their types
            if (required && (!fieldValue || typeof fieldValue !== type)) {
                return `Invalid value for field '${field}'`;
            }

            if (!required && fieldValue !== null && fieldValue !== undefined && typeof fieldValue !== type) {
                return `Invalid value for field '${field}'`;
            }
        }
    }

    return true;
};


// Controller for adding a user
exports.adduser = async (req, res) => {
    try {
        const user = req.body;
        const validationError = validateUser(user, false);

        if (validationError !== true) {
            res.status(400).send({ message: validationError });
            return;
        }

        const result = await collection.insertOne(user);
        const userDetails = await collection.findOne({ "_id": result.insertedId })
        res.status(201).send({ message: 'user added successfully', id: result.insertedId, user: userDetails });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error adding user', error: err });
    }
};

// Controller for getting all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await collection.find().toArray();
        res.status(200).send({ message: 'users retrieved successfully', users });
    } catch (err) {
        res.status(500).send({ message: 'Error getting users', error: err });
    }
};

// Controller for getting a user by its ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await collection.findOne({ _id: userId });
        console.log(user)
        res.status(200).send({ message: 'user retrieved successfully', user });
    } catch (err) {
        res.status(500).send({ message: 'Error getting user', error: err });
    }
};

// Controller for updating a user
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = req.body;
        // const validationError = validateUser(user, true);

        // if (validationError !== true) {
        //     res.status(400).send({ message: validationError });
        //     return;
        // }

        await collection.updateOne({ _id: userId }, { $set: user });
        res.status(200).send({ message: 'user updated successfully', user });
    } catch (err) {
        res.status(500).send({ message: 'Error updating user', error: err });
    }
};

// Controller for deleting a user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await collection.deleteOne({ _id: new ObjectId(userId) });
        res.status(200).send({ message: 'user deleted successfully', status: true, id: userId });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting user', error: err });
    }
};