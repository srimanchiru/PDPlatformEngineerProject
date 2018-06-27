'use strict';

const aws = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const sns = new aws.SNS();
const dynamoDb = new aws.DynamoDB.DocumentClient();

const RESPONSE = {
  OK : {
    status : 200,
    message: "You have successfully unsubscribed to the newsletter!",
  },
  NOT_FOUND : {
    status : 400,
    message : "email not suscribed for newsletter."
  },
  ERROR : {
    status : 400,
    message: "Something went wrong. Please try again."
  }
};


module.exports.handler = (event, context, callback) => {
  
   var email = event.body.email;
    
    if(!email){
        // If we don't get an email, we'll end our execution and send an error
        return callback(null, RESPONSE.ERROR);
    }
  
  const params = {
    TableName: "Emails",
    Key: {
      email: email,
    },
  };

  var unsubscribe_params = {
    TopicArn: 'arn:aws:sns:us-east-2:123456789:dynamodb', /* required */
  };
  
  sns.listSubscriptionsByTopic(unsubscribe_params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else  {   
      
      var unSubscribeEmail = {};
      for (var i in data.Subscriptions) {
        var subscriber = data.Subscriptions[i];
        if(subscriber.Endpoint == email){
          unSubscribeEmail = subscriber;
          break;
        }
        
      }
     
      console.log(unSubscribeEmail);
      
      if(unSubscribeEmail && unSubscribeEmail.SubscriptionArn && unSubscribeEmail.SubscriptionArn != 'PendingConfirmation'){
        sns.unsubscribe({SubscriptionArn : unSubscribeEmail.SubscriptionArn }, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
             // delete the email from the database
            dynamoDb.delete(params, (error) => {
              // handle potential errors
              if (error) {
                return callback(null, RESPONSE.NOT_FOUND);
              }
          
               callback(null, RESPONSE.OK);
            });
          }        // successful response
        });
      }else{
        callback(null, RESPONSE.NOT_FOUND);
      }
    }
  });

};
