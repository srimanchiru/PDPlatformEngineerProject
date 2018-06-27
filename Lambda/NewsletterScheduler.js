'use strict';

 var https = require("https");
 var aws = require('aws-sdk');
var dynamoDb = new aws.DynamoDB();
var sns = new aws.SNS();
 
module.exports.handler = (event, context, callback) => {
  var options = {
  host: 'api.chucknorris.io',
  path: '/jokes/random',
  method : 'GET'

};

const RESPONSE = {
  OK : {
    status : 200,
    message: "Emails sent successfully to subscribers!!!",
  },
  ERROR : {
    status : 400,
    message: "Something went wrong. Please try again."
  }
};


var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      console.log(responseObject.value);
      send_email(responseObject.value, callback);
    });
  });

  //req.write(dataString);
  req.end();
  
  function send_email(messageBody, callback){
   
    const params = {
      TableName: "Emails",
      
    };
    
    const done = (err, result) => function(){
       if(err) console.log(err)
       if(result) console.log(result)
     }
     
     var emails= [];
     
    dynamoDb.scan(params, (error, data) => {
    // handle potential errors
    if (error) {
      console.log("error reading data from table")
      callback(null, RESPONSE.Error);
    }
    console.log(data.Items.length);
      for (var i in data.Items) {
        i = data.Items[i];
        console.log(i.email.S);
        
        emails.push(i.email.S);
        
      }
      
      aws.config.update({
          resources : {
            Resources:{
              MailQueue:{
                Properties:{
                  Subscription:{
                    Endpoint: emails
                  }
                }
              }
            }
          }
          
        })
        
        sns.publish({
            Message: messageBody,
            Subject: "Chuck Norris Jokes!!",
            TopicArn: "arn:aws:sns:us-east-2:123456789:dynamodb"
            
        }, done);
      
      callback(null, RESPONSE.OK);
    
  });
  }
};
