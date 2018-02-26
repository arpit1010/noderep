//Server code goes here
var express    = require("express");
var app        = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 3002;

app.use(express.static("./"));

app.get("/", function(req, res) {  
    res.redirect("http://localhost:3002/client/index.html");
});

app.get('/getPayments', function(req, res) {

    // use mongoose to get all todos in the database
   var content = fs.readFileSync('payments.json');
   res.send(content);
});
app.post('/updatepayment', function(req, res) {
    var reqObj ={
        id:req.body.id,
        counterparty:req.body.counterparty,
        currency:req.body.currency,
        valueDate:req.body.valueDate,
        creditAccount:req.body.creditAccount,
        amount:req.body.amount
    }; 
    
       var content = fs.readFileSync('payments.json');
       
       var jsoncontent = JSON.parse(content);
       console.log(jsoncontent);
       for(let i = 0;i<jsoncontent.length;i++){
           if(jsoncontent[i].id === reqObj.id){
               console.log("code is here")
               jsoncontent[i] = reqObj;
               console.log(jsoncontent);
               fs.writeFileSync("payments.json",JSON.stringify(jsoncontent))
           }
       }
       var newcontent = fs.readFileSync('payments.json');
       res.send(newcontent);
    });
app.post('/savenewpayment', function(req, res) {
    var reqObj ={
        id:req.body.id,
        counterparty:req.body.counterparty,
        currency:req.body.currency,
        valueDate:req.body.valueDate,
        creditAccount:req.body.creditAccount,
        amount:req.body.amount
    }; 
    
       var content = fs.readFileSync('payments.json');
       
       var jsoncontent = JSON.parse(content);
       console.log(jsoncontent);
       jsoncontent.push(reqObj);
       fs.writeFileSync("payments.json",JSON.stringify(jsoncontent))
       var newcontent = fs.readFileSync('payments.json');
       res.send(newcontent);
    });
app.post('/deletepayment', function(req, res) {
var id = req.body.id;

    console.log(id);
   var content = fs.readFileSync('payments.json');
   
   var jsoncontent = JSON.parse(content);
   console.log(jsoncontent);
   for(let i = 0;i<jsoncontent.length;i++){
       if(jsoncontent[i].id === id){
           console.log("code is here")
           jsoncontent.splice(i,1);
           console.log(jsoncontent);
           fs.writeFileSync("payments.json",JSON.stringify(jsoncontent))
       }
   }
   var newcontent = fs.readFileSync('payments.json');
   res.send(newcontent);
});
app.get('/getPayments', function(req, res) {

    // use mongoose to get all todos in the database
   var content = fs.readFileSync('payments.json');
   res.send(content);
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});