const express = require('express');
const path = require('path');

const adminRouter = require('./routes/admin');

// Create a new Express application.
const app = express();

// Configure Express application.
app.use(require('morgan')('combined')); //http logs
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);

app.get('/', function(req,res){
	res.send('Ok, server is working')
})

module.exports = app;
//app.listen(3000);
