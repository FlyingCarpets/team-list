const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.set('etag', false);

app.listen(port, () => console.log(`Listening on port ${port}`));

// TODO: remove
const dogs = {
    1: {
        name: 'Beagle',
        height: 'short',
    },
    2: {
        name: 'Beagle',
        height: 'short',
    },
};

// get test
app.get('/api/dogs', (req, res) => {
    res.send(dogs);
});
//
// //get with route params test
// app.get('/api/dogs/:id', (req, res) => {
//     if (req.params.id in dogs) {
//         res.send(dogs[req.params.id]);
//     } else {
//         res.status(404).send('Breed not found');
//     }
// });
//
// //update with route params + query test
// app.put('/api/dogs/:id', (req, res) => {
//     if (req.params.id in dogs) {
//         const dogUpdates = req.query;
//         dogs[req.params.id] = dogUpdates;
//         res.send(dogs[req.params.id]);
//     } else {
//         res.status(404).send('Breed not found');
//     }
// });
//
// //post new data test
// app.post('/dogs', (req, res) => {
//     const newData = req.query;
//     const foo = Object.assign(dogs, newData);
//     res.send(foo);
// });
