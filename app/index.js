/*jslint node: true */

'use strict';
var express = require('express');

// create instance of the server to variable app
var app = express();

// serve static files
app.use('/', express.static('public/'));

// have our app listen on port 3000
app.listen(3000, function() {
    console.log('Service on running on 3000');
});