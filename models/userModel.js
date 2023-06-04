const userSchema = {
    _id: {
        required: true,
        type: 'string',
    },
    accessToken: {
        required: true,
        type: 'string',
    },
    displayName: {
        required: true,
        type: 'string',
    },
    email: {
        required: true,
        type: 'string',
    },
    emailVerified: {
        required: true,
        type: 'boolean',
    },
    phoneNumber: {
        required: false,
        type: 'string',
    },
    photoURL: {
        required: false,
        type: 'string',
    },
    uid: {
        required: true,
        type: 'string',
    },
    id: {
        required: true,
        type: 'string',
    },
};

module.exports = userSchema;
