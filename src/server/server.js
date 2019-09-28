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
  const path = getUserProfilePath(req.params.userid);
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
  const folderPath = getUserProfileFolder(req.params.userid);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  console.log(req.body);
  fs.writeFileSync(folderPath + "/profile.json", JSON.stringify(req.body));
  res.send("OK")  
})

app.get("/sellers", function(req, res) {
  const userids = getDirectories("../public/user/");
  const seller_ids = userids.filter((userid) => userid.startsWith("seller"));
  const results = []
  seller_ids.forEach((seller_id) => {
    const profile = JSON.parse(fs.readFileSync(getUserProfilePath(seller_id)).toString());
    results.push(profile);
  });
  return res.json({"results": results});
})

app.get("/buyers", function(req, res) {
  const userids = getDirectories("../public/user/");
  const seller_ids = userids.filter((userid) => userid.startsWith("buyer"));
  const results = []
  buyer_ids.forEach((buyer_id) => {
    const profile = JSON.parse(fs.readFileSync(getUserProfilePath(buyer_id)).toString());
    results.push(profile);
  });
  return res.json({"results": results});
})

app.get("/basket/:userid", function(req, res) {
  console.log("Getting basket for user " + req.params.userid)
  const path = getUserBasketPath(req.params.userid);
  if (fs.existsSync(path)) {
    const result = JSON.parse(fs.readFileSync(path).toString());
    console.log(result);
    res.json(result);
  } else {
    res.json({"items": []})
  }
})

app.post('/basket/:userid', function(req, res) {
  console.log("Updating basket for user " + req.params.userid);
  const folderPath = getUserProfileFolder(req.params.userid);
  const path = getUserBasketPath(req.params.userid);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  console.log(req.body);
  fs.writeFileSync(path, JSON.stringify(req.body));
  res.send("OK")  
})

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

const getUserProfilePath = (userId) => {
  return "../public/user/" + userId + "/profile.json";
}

const getUserBasketPath = (userId) => {
  return "../public/user/" + userId + "/basket.json";
}

const getUserProfileFolder = (userId) => {
  return "../public/user/" + userId;
}

app.listen(process.env.PORT || 8080);