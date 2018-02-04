const express = require('express');
const Member = require('./db').Member;
const app = express();
const port = process.env.PORT || 5000;

app.set('etag', false);

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/team', (req, res) => {
    Member.find({}, (err, members) => {
        res.send(members);
    })
});

app.get('/api/member/:name', (req, res) => {
    const name = req.params.name;

    Member.findOne({ link: name }, (err, member) => {
        if (member) {
            res.send(member);
        } else {
            res.status(404).send({error: 'Member not found'});
        }
    })
});

app.put('/api/member/:name', (req, res) => {
    const name = req.params.name;

    Member.findOneAndUpdate({ link: name }, { name: req.query.name, department: req.query.department }, { new: true }, (err, member) => {
        res.send(member);
    })
});

// Without mongodb:
// const team = [
//     {
//         "department": "FBI",
//         "image": "https://thestudioexec.com/wp-content/uploads/2017/05/twindalecooper.jpg",
//         "name": "Dale Cooper",
//         "link": "dale-cooper"
//     },
//     {
//         "department": "Town of Twin Peaks",
//         "image": "https://pmcvariety.files.wordpress.com/2015/09/twinpeaks_loglady.jpg?w=700&h=393&crop=1",
//         "name": "Log Lady",
//         "link": "log-lady"
//     },
//     {
//         "department": "Town of Twin Peaks",
//         "image": "https://chicagoliterati.files.wordpress.com/2015/01/nadine.jpg?w=500",
//         "name": "Nadine Hurley",
//         "link": "nadine-hurley"
//     },
//     {
//         "department": "US Air Force",
//         "image": "https://vignette.wikia.nocookie.net/twinpeaks/images/f/f5/Garland_Briggs.png/revision/latest?cb=20161021155038",
//         "name": "Garland Briggs",
//         "link": "garland-briggs"
//     },
//     {
//         "department": "FBI",
//         "image": "https://i.ytimg.com/vi/Ncj1GQkkbkE/maxresdefault.jpg",
//         "name": "Denise Bryson",
//         "link": "denise-bryson"
//     },
//     {
//         "department": "Test",
//         "image": "http://via.placeholder.com/350x150",
//         "name": "Denise Test",
//         "link": "denise-test"
//     }
// ];

// app.get('/api/team', (req, res) => {
//     res.send(team);
// });
//
// app.get('/api/member/:name', (req, res) => {
//     const teamFiltered = team.filter(member => member.link === req.params.name);
//
//     if (teamFiltered.length) {
//         res.send(teamFiltered[0]);
//     } else {
//         res.status(404).send({error: 'Member not found'});
//     }
// });
//
// app.put('/api/member/:name', (req, res) => {
//     const updatedMember = team.filter(member => member.link === req.params.name);
//
//     if (updatedMember.length) {
//         const memberUpdates = Object.assign(updatedMember[0], req.query);
//         res.send(memberUpdates);
//     } else {
//         res.status(404).send('Member not found');
//     }
// });


// //example for updating data with POST
// app.post('/api/team', (req, res) => {
//     const dogUpdates = Object.assign(team, req.query);
//     res.status(201).send(dogUpdates);
// });
