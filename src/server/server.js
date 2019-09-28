const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(express.json());
// app.use(bodyParser());
// app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json({
  type: ['application/json', 'text/plain']
}))

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/user/:userid/profile', function(req, res) {
  console.log("Getting profile for user " + req.params.userid)
  const path = "../public/user/" + req.params.userid + "/profile.json";
  if (fs.existsSync(path)) {
    const result = JSON.parse(fs.readFileSync(path).toString());
    console.log(result);
    res.json(result);
  } else {
    res.json({})
  }
})

app.post('/user/:userid/profile', function(req, res) {
  console.log("Updating profile for user " + req.params.userid);
  const folderPath = "../public/user/" + req.params.userid;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  console.log(req.body);
  // console.log(req);
  fs.writeFileSync(folderPath + "/profile.json", JSON.stringify(req.body));
  res.send("OK")  
})

app.listen(process.env.PORT || 8080);