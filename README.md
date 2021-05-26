# serverless-api
Serverless REST API with Node.js, AWS Lambda, API Gateway, RDS and PostgreSQL.

In this project I make use of the Serverless Framework to build and deploy a simple Node.js RESTful API to Lambda and API Gateway. The API handles a database of authors and their publications and the data is stored in Amazon Relational Database Service (RDS) for PostgreSQL using sequelize ORM.

The API performs CRUD (Create, Read, Update and Delete) operations on authors and publications. There is a single lambda function for each endpoint.

Publications have a date and time, title and body. Authors have their first and last name, email and date of birth.

To see this project working:

1. Set up a new PostgreSQL RDS

2. Clone the project

3. In the root of the project create a config/config.json file and configure the DB access to the different environments with the RDS credentials like in the following setup for the development environment:

{
  "development": {
    "username": "master",
    "password": "DBPassword",
    "database": "postgres",
    "host": "amazon-rds-host-info",
    "port": "5432",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

4. Install the project's dependencies: "npm install"

5. Initiate sequelize: "node_modules/.bin/sequelize init"

6. Migrate the models into the DB: "node_modules/.bin/sequelize db:migrate"

7. Populate the DB through the seeders: "node_modules/.bin/sequelize db:seed:all"

By now you should be able to open PgAdmin or any other DB client, configure its connection to the DB with the RDS credentials and see the tables and data stored.

8. Initialize the API locally by running the serverless-offline node module: "serverless offline"

You should be seeing on the terminal the API endpoints like this:

![Screen Shot 2021-05-26 at 5 13 50 PM](https://user-images.githubusercontent.com/14207804/119738225-fa856880-be45-11eb-850d-fe1e421766fe.png)

9. Start making requests and exploring the API through POSTMAN:

![Screen Shot 2021-05-26 at 5 18 19 PM](https://user-images.githubusercontent.com/14207804/119738506-6e277580-be46-11eb-9ea5-1ccc46d76333.png)

![Screen Shot 2021-05-26 at 5 19 25 PM](https://user-images.githubusercontent.com/14207804/119738626-9adb8d00-be46-11eb-9681-ac1d514cef0c.png)

![Screen Shot 2021-05-26 at 5 20 45 PM](https://user-images.githubusercontent.com/14207804/119738733-c3fc1d80-be46-11eb-8961-67cb08c5d2ed.png)

![Screen Shot 2021-05-26 at 5 23 38 PM](https://user-images.githubusercontent.com/14207804/119738958-26edb480-be47-11eb-82ae-3875b2d11094.png)

![Screen Shot 2021-05-26 at 5 24 59 PM](https://user-images.githubusercontent.com/14207804/119739106-56042600-be47-11eb-8066-98db016f0e97.png)

![Screen Shot 2021-05-26 at 5 26 02 PM](https://user-images.githubusercontent.com/14207804/119739195-79c76c00-be47-11eb-81e9-0dd9f38e4c08.png)

![Screen Shot 2021-05-26 at 5 27 07 PM](https://user-images.githubusercontent.com/14207804/119739312-a67b8380-be47-11eb-8345-2141b869034d.png)

![Screen Shot 2021-05-26 at 5 28 39 PM](https://user-images.githubusercontent.com/14207804/119739434-d9be1280-be47-11eb-816e-3b05b92bfd8a.png)

10. If you want you can deploy the API to AWS lambda by running the serverless framework command: "serverless deploy"
