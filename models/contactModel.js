const contactSchema = {
    name: {
        required: true,
        type: 'string',
    },
    countryCode: {
        required: true,
        type: 'string',
    },
    phone: {
        required: true,
        type: 'string',
    },
    photo: {
        required: false,
        type: 'string',
    },
    addedBy: {
        required: true,
        type: 'string',
    },
};

module.exports = contactSchema;
