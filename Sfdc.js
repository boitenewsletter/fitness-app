    
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

console.log('Auth token API hit');
  request({
    url: 'https://test.salesforce.com/services/oauth2/token?client_id=3MVG9d3kx8wbPieFTimr8wVzVWhhJYiLu_gh8eB5hLaz3ECk55tbOVXa9z.Mh0lm9F6tdGR6O4xqg1rkKAEr_&client_secret=7587859007039327259&grant_type=password&username=integrationuser@capgemini.com&password=Iuser1233wZ0QE7BKG3bKz7kR3Tqrv91' ,
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
        "content-type": "application/x-www-form-urlencoded"
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
      console.log('getAuthTokenService API hit:', response.statusCode)
	   console.log(body.access_token)
        console.log('sandeeeeeeeee')
      callback(undefined, {
        token: body.access_token,
        refresh_token: body.refresh_token,
        });
      }
  });


}

module.exports = {
    getAuthTokenService,
    sfdcToken
};
