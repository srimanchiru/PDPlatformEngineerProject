Step1: Create the Cloudformation Stack using AWS CLI and use the input CFT template PDPlatformEngineerProject/pdplatformengineer.yaml
Step2: Copy the PDPlatformEngineerProject/NewsletterUI/ code into S3 bucket

TEST URL: http://newletter-subscription-app.s3-website.us-east-2.amazonaws.com/

## Product Development Platform Engineer Project

This project is meant to demonstrate several of the skills we are looking for in the product development platform team. Some requirements are left intentionally vague so that we can see your architecting and problem solving skills, and to allow you some creative freedom. That being said, do not hesitate to ask us questions about the project.


### Project Description

Create a serverless application on AWS that deploys via CloudFormation.

This application should expose two API endpoints. One to `subscribe` an email address, and another to `unsubscribe`. Once subscribed, an email should be sent once a day containing a random fact/joke/quote.

#### Deliverables

Put all of your relevant code and documentation in a git repository. We prefer GitHub, but as long as it is web accessible, you can put it up wherever you have an account.

How you organize your project and generate CloudFormation is up to you. All we ask is that you include the final CloudFormation template in a `cloudformation.yaml` file at the root of your project.

#### Notes
  * You should be able to stay in the AWS "Free Tier" for this project.
  * We expect a minimal project to take 2-5 hours of your time, depending on your familiarity with AWS.
  * While AWS SES would provide prettier email formatting, it is not free. You may use AWS SNS topics with an email endpoint.
  * Feel free to use a public API for your random content.
    * [Inspirational Quotes](http://forismatic.com/en/api/)
    * [Ron Swanson Quotes](https://ron-swanson-quotes.herokuapp.com/v2/quotes)
    * [Chuck Norris Jokes](https://api.chucknorris.io/)
    * [Dad Jokes](https://icanhazdadjoke.com/api#fetch-a-random-dad-joke)

#### Bonus Points
If you have extra time and really want to impress us, here are a few suggestions.

  * Add tests and CI via CodeBuild
  * Add CodePipeline to auto-deploy your CloudFormation template
  * Add a simple UI that uses your API
  * Fully utilize APIGateway's capabilities in the swagger specification (validation, models, etc)
  * Extend functionality
    * Allow subscriptions to schedule their emails
    * Allow subscriptions to choose topics for their random content
  * Add a CloudWatch dashboard that shows important metrics for monitoring your service
