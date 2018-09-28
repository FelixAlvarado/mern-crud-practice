let express = require('express');
let app = express();
let parser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let keys = require('./keys.js');

app.use(parser.json());

// app.use(cors());

app.use(express.static('./public'));

mongoose.connect(keys.mongourl);

let people = [{name:'Ed', city: 'San Francisco'},
{name: 'Felix', city: 'San Mateo'}, 
{name: 'Wolfie', city: 'Redwood City'}];

app.get('/people',(req, res)=>{
    res.send(people);
});

app.post('/save', (req,res)=>{
    people.push(req.body);
    res.send(people);
});

app.delete('/delete/:idx', (req,res) => {
    let index = req.params.idx;
    let length = people.length;
    console.log('people before', people);
    people = people.slice(0, index).concat(people.slice(index + 1, length));
    console.log('people after', people);
    res.send(people);
});

app.listen(4000, ()=> {
    console.log('listening on port 4000');
});