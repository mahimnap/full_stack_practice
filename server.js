const express = require('express');
const multer = require('multer'); //npm install -- designed specifically for multipart/form-data (especially uploads)
const path = require('path'); 
const xml2js = require('xml2js');

const upload = multer(); 
const app = express(); 

app.use(express.static(path.join(__dirname, 'public')));

app.get ('/', (req, res) => {
    console.log("X (eventually UID) user is on home page");
});

app.post('/signIn', upload.none(), (req, res) => { //Multipart/form-data 
    const varNames = Object.keys(req.body);
    console.log(`These are the variable names: ${varNames}`); 
    console.log(`This is the username: ${req.body.username}`); 
    console.log(`This is the password: ${req.body.password}`);
    res.redirect('/'); 
}); 

//extended = false = just relies on the querystring library to parse the url passed in the body - more backward compat.
//extended = true = supports nested objects and arrays (relies on the qs library instead of querystring)
//extended true allows for more complex use of url encoding, that kind of replicates JSON parsing 
app.post('/signUp', express.urlencoded({extended: false}), (req, res) => { //application/x-www-form-urlencoded
    const varNames = Object.keys(req.body); 
    console.log(`These are the variable names: ${varNames}`);
    console.log(`This is the username: ${req.body.createUser}`);
    console.log(`This is the password: ${req.body.createPass}`);
    const jsonResponse = {
        username: req.body.createUser, 
        password: req.body.createPass,
        message: "SIGNED UP!"
    }
    res.json(jsonResponse); 
});

app.post ('/characteristics', express.json(), (req, res) => {
    const varNames = Object.keys(req.body); 
    console.log(`These are the variable names: ${varNames}`);
    console.log(`This is the height: ${req.body.heightInches}`);
    console.log(`This is the weight: ${req.body.weightLbs}`);
    console.log(`This is the age: ${req.body.age}`); 
    const jsonResponse = {
        heightInches: req.body.heightInches, 
        weightLbs: req.body.weightLbs,
        age: req.body.age, 
        message: "Characteristics Saved!"
    }
    res.json(jsonResponse); 
}); 

app.post('/rateBook', (req, res) => {
    const xmlData = req.body; 
    const //WORKING HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe
});

app.listen(3000, () => {
    console.log('Server Listening on http://localhost:3000'); 
});