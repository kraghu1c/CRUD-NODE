const config = require("./config")
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (req, res)=> {
    res.send('hello from node api server updated')
});

mongoose.connect(`mongodb+srv://krishank:${config.password}@node-practice.zdyab6n.mongodb.net/?retryWrites=true&w=majority&appName=node-practice`)
  .then(() => {
    console.log('Connected to the data base')
    app.listen(3000, ()=> {
        console.log('server is running on port 3000');
    });
})
.catch((e) => {
    console.log('Connection failed '+e)
})


//userName:krishankraghuvanshi
//password:wSepbzYEofuZ0DWh
