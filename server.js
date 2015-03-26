var qs = require('querystring');
var fs = require('fs');
var http = require('http');
var pkg = require('./package.json');
var ecstatic = require('ecstatic');
var aws = require('aws-sdk');

var server = http.createServer(function(req, res) {
  var url = req.url.split('?')[0];
  var query = qs.parse(req.url.split('?')[1]);
  if (url === '/sign_s3') {
    // do s3 sign
    aws.config.update({accessKeyId: pkg.env.key, secretAccessKey: pkg.env.secret});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: pkg.env.bucket,
        Key: query.s3_object_name,
        Expires: 60,
        ContentType: query.s3_object_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
      if(err){
        res.writeHead(500, 'text/plain');
        res.end(err);
      }
      else {
        var return_data = {
          signed_request: data,
          url: 'https://'+pkg.env.bucket+'.s3.amazonaws.com/'+query.s3_object_name
        };
        res.write(JSON.stringify(return_data));
        res.end();
      }
    });
  } else {
    ecstatic({ 
      root: __dirname + '/public', 
      handleError: false
    })(req,res, function next() {
      res.writeHead(200, 'text/html');
      fs.createReadStream(__dirname + '/public/index.html').pipe(res);
    });
  }
});

server.listen(process.env.PORT || 9966);