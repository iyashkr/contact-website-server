const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://armusdigital:tKoz1oZBvUJKIxsv@contactapp.dw1s2qs.mongodb.net/contact?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;

