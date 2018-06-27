'use strict';

const aws = require('aws-sdk'); 
const sns = new aws.SNS();


const RESPONSE = {
  
  ERROR : {
    status : 400,
    message: "Something went wrong. Please try again."
  }
};

exports.handler = (event, context, callback) => {
    
  var unsubscribe_params = {
    TopicArn: 'arn:aws:sns:us-east-2:123456789:dynamodb', /* required */
  };
  
  var result = [];
    sns.listSubscriptionsByTopic(unsubscribe_params, function(err, data) {
        if (err){ 
            console.log(err, err.stack);
            callback(null, RESPONSE.ERROR);
        } // an error occurred
        else  {   
          
          for (var i in data.Subscriptions) {
            var sub = {};
            var subscriber = data.Subscriptions[i];
            sub.email = subscriber.Endpoint;
            sub.subscriptionStatus = subscriber.SubscriptionArn == 'PendingConfirmation' ? subscriber.SubscriptionArn : "Subscribed";
            result.push(sub);
          }
          callback(null, {
               status : 200,
               data: result
          })
          
        }
    });
   
};
