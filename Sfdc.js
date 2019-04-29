    
const request= require('request');


var getAuthTokenService = (callback) =>{

  var username= 'gwengraman@gmail.com';
  var password= 'Gwen@123';
  var authToken= "Basic " + new Buffer(username + ':' + password).toString('Base64');
  console.log('Auth token API hit');
  request({
    url: 'https://capgemini01-alliance-prtnr-eu06-dw.demandware.net/s/CapCafe/dw/shop/v18_3/customers/auth?client_id=e4bd2b6d-1567-475d-9eb2-b2c86a37a560' ,
    body: {
      "type": "credentials"
    },
    method: 'POST',
    headers: {
        "content-type": "application/json",
        "authorization": authToken
      },
    json: true
  }, (error, response, body) => {

    if(error){
      callback('There was an error connecting to the server');
    }
    else if(response.statusCode == 400){
      callback('Unable to get the token');
    }
    else if(response.statusCode == 200){
      console.log('API hit:', response.statusCode)

      callback(undefined, {
        token: response.headers['authorization'],
        customer_id: body.customer_id,
        email: body.email,
        });
      }
  });
};



var sfdcToken = (callback) => {
var http = require("https");

var options = {
  "method": "POST",
  "hostname": [
    "28021019085421fddss",
    "my",
    "salesforce",
    "com"
  ],
  "path": [
    "services",
    "oauth2",
    "token"
  ],
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "Postman-Token": "f7edc9f6-06aa-4347-9c3e-36d6329d1fb6"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
      
      console.log('sandeeeeeeeeeep');
  });
});

req.end();


}





module.exports = {
    getAuthTokenService,
    sfdcToken
};
