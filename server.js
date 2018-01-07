const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.set('etag', false);

app.listen(port, () => console.log(`Listening on port ${port}`));

// TODO: remove
const team = [
    {
        "department": "FBI",
        "image": "https://thestudioexec.com/wp-content/uploads/2017/05/twindalecooper.jpg",
        "name": "Dale Cooper"
    },
    {
        "department": "Town of Twin Peaks",
        "image": "https://pmcvariety.files.wordpress.com/2015/09/twinpeaks_loglady.jpg?w=700&h=393&crop=1",
        "name": "Log Lady"
    },
    {
        "department": "Town of Twin Peaks",
        "image": "https://chicagoliterati.files.wordpress.com/2015/01/nadine.jpg?w=500",
        "name": "Nadine Hurley"
    },
    {
        "department": "US Air Force",
        "image": "https://vignette.wikia.nocookie.net/twinpeaks/images/f/f5/Garland_Briggs.png/revision/latest?cb=20161021155038",
        "name": "Garland Briggs"
    },
    {
        "department": "FBI",
        "image": "https://i.ytimg.com/vi/Ncj1GQkkbkE/maxresdefault.jpg",
        "name": "Denise Bryson"
    },
    {
        "department": "Test",
        "image": "http://via.placeholder.com/350x150",
        "name": "Denise Test"
    }
];

app.get('/api/team', (req, res) => {
    team.forEach(member => {
        member.link = member.name.replace(/\s+/g, '-').toLowerCase();
    });
    res.send(team);
});

app.get('/api/team/:name', (req, res) => {
    if (req.params.name in team) {
        res.send(team[req.params.name]);
    } else {
        res.status(404).send('Member not found');
    }
});

//
//get with route params test
// app.get('/api/team/:id', (req, res) => {
//     if (req.params.id in team) {
//         res.send(team[req.params.id]);
//     } else {
//         res.status(404).send('Breed not found');
//     }
// });
//
//update with route params + query test
app.put('/api/team/:id', (req, res) => {
    if (req.params.id in team) {
        const dogUpdates = Object.assign(team[req.params.id], req.query);
        res.send(dogUpdates);
    } else {
        res.status(404).send('Breed not found');
    }
});
//
//post new data test
app.post('/api/team', (req, res) => {
    const dogUpdates = Object.assign(team, req.query);
    res.status(201).send(dogUpdates);
});
