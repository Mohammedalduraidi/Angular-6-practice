const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express(); 
const handler = require('./handler.js');
app.use(express.static(path.join(__dirname, '../sales/dist/sales')));
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
app.use(session({
    secret: 'very very secret', 
    resave: true, 
    saveUninitialized: true
})); 


 app.post("/signup", handler.signup);
app.post("/login", handler.login);



app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../sales/dist/sales/index.html')))
  });


const PORT = process.env.PORT || 3000; 

app.listen(PORT, () =>{
  console.log(`listening on port : ${PORT}`);
});