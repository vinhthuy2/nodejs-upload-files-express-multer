var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    const [name, ext] = file.originalname.split('.');
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

var upload = multer({ storage: storage });
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.post('/api/photo', upload.single('avatar'), function(req, res) {
  console.log('done', req.file.filename);
  res.end('done');
});

app.listen(3000, function() {
  console.log('Working on port 3000');
});
