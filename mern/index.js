let express = require('express');
let app = express();
let parser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let keys = require('./keys.js');
let {Schema} = require('mongoose');

let peopleSchema = new Schema({name:{type:String, trim: true}, city:{type:String, trim: true}});

let People = mongoose.model('people', peopleSchema);
app.use(parser.json());

app.use(cors());

// app.use(express.static('./public'));




mongoose.connect(keys.mongourl);

let people = [{name:'Ed', city: 'San Francisco'},
{name: 'Felix', city: 'San Mateo'}, 
{name: 'Wolfie', city: 'Redwood City'}];

app.get('/people',(req, res)=>{
    People.find({}).then(data => res.send(data));
});

app.post('/save', (req,res)=>{
    People.create(req.body).then(() =>{
        People.find({}).then(data => res.send(data));
    });
});

app.delete('/delete/:idx', (req,res) => {
    let index = req.params.idx;
    let length = people.length;
    console.log('people before', people);
    //modifying deletion. not working for some reason
    people = people.slice(0, index).concat(people.slice(index + 1, length));
    console.log('people after', people);
    res.send(people);
});

app.listen(4000, ()=> {
    console.log('listening on port 4000');
});