'use strict';

const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.get('/', (req, res, next)=> {
    console.log("Hello World");
    next();
  });

app.get('/:code/:location/:accounts-server', (req,res, next)=>{
    console.log("accepts Redirect request to which Zoho Accounts redirects you with a grant token(code) after successful authentication");
    //User sends the request id to cancel the verification request
    console.log("Code: " + req.params.code);
    console.log("Account Server: " + req.params.accounts-server);
    next();
})


app.get('/authorize_request', (req,res)=>{
    console.log("Redirect link to which Zoho Accounts redirects you with a grant token(code) after successful authentication");
    //User sends the request id to cancel the verification request

    let grant_type = req.body.grant_type;
    let client_id = req.body.client_id;
    let client_secret = req.body.client_secret;
    let redirect_uri = req.body.redirect_uri;
    let code = req.body.code;
    console.log("Request: " + req);
    console.log("Response: " + res);

})
app.use(express.static(path.join(__dirname,'client/build' )));

app.listen(5000, function () {
console.log('Marketing Ad app: Client Server; listening on port '+ port);
});