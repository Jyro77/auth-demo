const express = require('express');
const app = express();
const User = require('./models/user');

app.get('/secret', (req, res) => {
    res.send('This is secret! You cannot see me unless you are logged in!')
})

app.listen(3000, ()=>{
    console.log('listen Port 3000');
})