const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/team';

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', callback => {
    console.log('db connected');
});

const memberSchema = mongoose.Schema({
    name: String,
    department: String,
    image: String,
    link: String,
});

exports.Member = mongoose.model('Member', memberSchema);

// If mongoose is not used:
// const MongoClient = require('mongodb').MongoClient;
//
// const findTeamMembers = (db, callback) => {
//     const cursor = db.collection('teamMembers').find();
//     cursor.each(function(err, doc) {
//         if(doc !== null) {
//             console.dir(doc);
//         } else {
//             callback();
//         }
//     })
// };
//
// MongoClient.connect(uri, (err, client) => {
//     const db = client.db('team');
//
//     findTeamMembers(db, function() {
//         client.close();
//     })
// });
