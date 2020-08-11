// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// environment variables
const app = express();
const PORT = process.env.PORT || 4000

// middleware 
app.use(express.urlencoded({ extended: false }))
app.use(express.json()); 
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())

// mongoose connection
mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
    console.log("connected to mongo");
})

app.use('/', require('./routes/posts'));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})