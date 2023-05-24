const express = require('express'); //npm installed
const app = express(); 
const path = require('path'); 

app.get ('/', (req, res) => { //these can be named anything but its usually called this 
    const filePath = path.join(__dirname, 'public', 'index.html'); //absolute path 
    res.sendFile(filePath); //send landing page
});

app.post('/signIn', (req, res) => {
    console.log ('post works'); 
    res.redirect('/'); 
})

app.listen(3000, () => {
    console.log('Server Listening on http://localhost:3000'); 
});