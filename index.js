const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost:27017/authDemo').
    then(()=>{
        console.log('DATABASE CONNECTED');
    })
    .catch(err =>{
        console.log('Connection Error');
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('This is the home page!');
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPass = await bcrypt.compare(password, user.password);
    if(validPass){
        res.send("Congrats!");
    } else {
        res.send("Good try, lets try again");
    } 
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
})

app.get('/secret', (req, res) => {
    res.send('This is secret! You cannot see me unless you are logged in!')
})

app.listen(3000, ()=>{
    console.log('listen Port 3000');
})