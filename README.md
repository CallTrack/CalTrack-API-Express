# CalTrack-API-Express

CalTrack-API-Express is an API that functions to process and provide data to the front-end (Android) regarding user information, 
foods with their respective calories, exercise movements that users can practice, and user's daily calories consumption/burned record.
This API is created by using Node.js as a server's runtime environment and later is deployed on compute engine service in Google Cloud Platform (GCP).

This project uses several libraries/packages that allow this API to be formed, including:
- **express**: a Node.js web framework that provides a robust set of features for web application, such as receive and respond to http request and create/manage http routes.
- **pg**: a collection of Node.js modules for interacting with PostgreSQL database.
- **nanoid**: unique string ID generator.
- **cors**: a module to enable cors options in server configuration.

The endpoint of this project is in the **index.js** file which contains the server configurations, which are uses the express framework to manage the routes in 
this API and also sets the port number used when the server is running.

The routes of this API are located in the **routes/api** folder where there are 4 route files, namely **foods.js**, **exercises.js**, **users.js**, 
and **records.js**. Each route files represent the services provided by this API.

PostgreSQL is used as a database to store the data provided by this API. There are 4 tables created to store and provide data for operations 
in the 4 routes of this API, namely **users**, **foods**, **exercises**, and **records**.

## Running API locally
There are two tools that must be installed before running this API:
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/
- git: https://git-scm.com/
- Postman: https://www.postman.com/

1. Make new project folder and then git clone this repository
   ```bash
   git clone https://github.com/CallTrack/CalTrack-API-Express.git
   ```
2. Open command shell, change directory to project folder, and install the project packages by:
   ```bash
   npm install
   ```
3. Open psql shell and then create caltrack database with 4 tables inside it by using PostgreSQL command:
   ```bash
   CREATE DATABASE caltrack;
   ```
   ```bash
   \c caltrack
   ```
   ```bash
   CREATE TABLE users (id_user varchar(255) PRIMARY KEY, 
    email varchar(255), 
    name varchar(255), 
    gender varchar(20), 
    age int, 
    weight float4, 
    height float4, 
    activity_level varchar(30), 
    daily_calories int);
   ```
   ```bash
   CREATE TABLE foods (
    id_food serial PRIMARY KEY,
    name varchar(255),
    calories_per_serving int
    );
   ```
   ```bash
   CREATE TABLE exercises (
    id_exercise serial PRIMARY KEY,
    name varchar(255),
    calories_per_minute int
    );
   ```
   ```bash
   CREATE TABLE records (id_record varchar(255) PRIMARY KEY,
    id_user varchar(255),
    date varchar(255),
    calories_in int,
    calories_burn int,
    total_calories int);
   ```
4. Insert some data in foods and exercises table by using this commands format:
   ```bash
   INSERT INTO foods (name, calories_per_serving)
   VALUES ('rendang', 155);
   ```
   ```bash
   INSERT INTO exercises (name, calories_per_minute)
   VALUES ('basketball', 10);
   ```
5. Run the API in command shell by:
   ```bash
   node index.js
   ```
   API server will run on localhost with port 3000.
6. Test the API routes by using Postman.
    
    
    
    
