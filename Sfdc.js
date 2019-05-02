const request = require('request');


var getAuthTokenService = (callback) => {

    var username = 'gwengraman@gmail.com';
    var password = 'Gwen@123';
    var authToken = "Basic " + new Buffer(username + ':' + password).toString('Base64');
    console.log('Auth token API hit');
    request({
        url: 'https://capgemini01-alliance-prtnr-eu06-dw.demandware.net/s/CapCafe/dw/shop/v18_3/customers/auth?client_id=e4bd2b6d-1567-475d-9eb2-b2c86a37a560',
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

        if (error) {
            callback('There was an error connecting to the server');
        } else if (response.statusCode == 400) {
            callback('Unable to get the token');
        } else if (response.statusCode == 200) {
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
        url: 'https://kering--sbxdamdev.cs102.my.salesforce.com/services/oauth2/token?client_id=3MVG95AcBeaB55lX.v7LGIE3EZGc_j1uaQZgrxvH9U1.aLfHAFQOd5wj7NaYcVCfAmRFvDFih9Fx5Av3sas6N&client_secret=1559497759196112275&grant_type=password&username=paramdeep.kaur@capgemini.com.sbxdamdev&password=Param@DCX1237ifVgJsZpbKNFL8qC43r99oiE',
        method: 'POST',
        rejectUnauthorized: false,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('There was an error connecting to the server');
        } else if (response.statusCode == 400) {
            callback('Unable to get the token');
        } else if (response.statusCode == 200) {
            console.log('getAuthTokenService API hit:', response.statusCode)
            console.log(body.access_token)
            console.log('sandeeeeeeeee')
            callback(undefined, {
                token: body.access_token,
                //console.log(body.access_token)
                //console.log('mandeep')
            });
        }
    });


};



var getUserDetailsww = (authToken, callback) => {

    console.log('Create cart API hit');
    request({
        url: `https://capgemini-sceuk-india--HybrisInt.cs91.my.salesforce.com/services/data/v44.0/sobjects/contact/0032F00000CWqtk`,
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${authToken}`
        },
        rejectUnauthorized: false,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('There was an error connecting to the server');
        } else if (response.statusCode == 400) {
            console.log('Cart already present');
            callback(undefined, {
                // basketId: body.fault.arguments.basketIds
            });
        } else if (response.statusCode == 200) {
            console.log('createCartService API hit:', response.statusCode)
            callback(undefined, {
                basketId: body,
                //name:body.value[0].name,
                //name1:body.objectDescribe.name
                name1: body.Email

            });
        }
    });

};


var getUserDetails = (authToken, callback) => {

    console.log('Update payment API hit');
    //console.log(`In updating payment method ${authToken} ${payment_id} ${order_no} ${total}`);
    request({
        url: `https://kering--SbxDamDev.cs102.my.salesforce.com/services/data/v44.0/sobjects/Account/0011j00000C3z1UAAR`,
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
        body: {
            "PersonEmail": "sandeep@gmail.com"
        },
        rejectUnauthorized: false,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('There was an error connecting to the server');
        } else if (response.statusCode == 400) {
            callback('Unable to get recommended products');
        } else if (response.statusCode == 200) {
            console.log("Update Payment Service API hit:", response.statusCode);
            callback('Order Completed');
        } else {
            console.log(response.statusCode);
        }
    });
};


var updatecase = (authToken, mode, callback) => {
     console.log(authToken);
   // console.log(test);
    console.log('Placing order API hit');
    request({
        url: `https://kering--SbxDamDev.cs102.my.salesforce.com/services/data/v44.0/sobjects/Case`,
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${authToken}`
        },
        body: {
            "Subject": "Request from Gucci Virtual Assistant",
            "RecordTypeId": "0120Y000000yCLf",
            "Area__c": "EMEA",
            "Language__c": "ENG",
            "Origin": "Google Assistant",
            "Status": "New",
            "Priority": "High",
            "OwnerId": "00G0Y000003wOCn",
            "AccountId": "0011j00000C3z1UAAR",
            "Preferred_Contact_Mode__c": `${mode}` 

        },
        rejectUnauthorized: false,
        json: true
    }, (error, response, body) => {
     console.log('fggfgfgff');   
     console.log(error);
	     console.log('line173');
        if (error) {
            callback('There was an error connecting to the server');
            console.log('error');
        } else if (response.statusCode == 401 || response.statusCode == 400) {
            callback('Unable to place an order');
            console.log('error2');
        } else if (response.statusCode == 200) {
            console.log("Place order API hit:", response.statusCode);
            callback(undefined, {
                code: 'testing',
                //payment_id: body.payment_instruments[0].payment_instrument_id
            });
        }
    });
};

var getUserDetailss = (authToken, listOfMode, callback) => {

    console.log('Update payment API hit');
    //console.log(`In updating payment method ${authToken} ${payment_id} ${order_no} ${total}`);
	console.log(listOfMode.email);
	console.log(listOfMode.phone);
	var testObj={};
	testObj.url=`https://kering--SbxDamDev.cs102.my.salesforce.com/services/data/v44.0/sobjects/Account/0011j00000C3z1UAAR`;
	testObj.method='PATCH';
	testObj.headers={
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        };
	if(listOfMode.email){
		testObj.body={
			"PersonEmail": `${listOfMode.email}`
		};
	}else{
	    testObj.body= {
		    "MobilePhone__c": `${listOfMode.phone}`
	};
}
	testObj.rejectUnauthorized=false;
	testObj.json=true;
    request(testObj, (error, response, body) => {
	    console.log(testObj.body);
        if (error) {
            callback('There was an error connecting to the server');
        } else if (response.statusCode == 400) {
            callback('Unable to get recommended products');
        } else if (response.statusCode == 200) {
            console.log("Update Payment Service API hit:", response.statusCode);
            callback('Order Completed');
        } else {
            console.log(response.statusCode);
        }
    });
};










function is
(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    getAuthTokenService,
    sfdcToken,
    getUserDetails,
    updatecase,
    getUserDetailss
};
