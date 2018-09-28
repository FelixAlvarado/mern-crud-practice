let express = require('express');
let app = express();
let parser = require('body-parser');

app.use(parser.json());

app.listen(4000, ()=> {
    console.log('listening on port 4000');
});



let people = [{name:'Ed', city: 'San Francisco'},
{name: 'Felix', city: 'San Mateo'}, 
{name: 'Wolfie', city: 'Redwood City'}];

app.get('/topics',(req, res)=>{
    res.send(people);
});