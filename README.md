#Note Taking Application

- Requirements:
    1. SPA -> React + ReactRouter (one redirect happens when okta is used)
    2. MVC -> SailsJS
    3. Authentication -> Okta Authentication
    4. Dependency Injection -> Its automatic
    5. Deployment -> 
    6. ORM (object relational mapping for more than 1 table) -> Waterline ORM

Overview:
    This application is made up of three different pieces. A client server that serves the SPA, an API 
    server consisting of SailsJS(MVC), and PostgreSql (accessed via waterline ORM). When an api request is 
    made a proxy sends those POST requests to the SailsJS server and then that accesses the PostgreSql
    database via Waterline ORM. SailsJS makes its connection to this db in the config/datastores.js file.
    All models are defined in api/models.js using the SailsJS models syntax. These models are then available
    in the api/controllers/api. 

- SPA
    React: For this i used react/react router. The only redirection occurs when logging in with okta. 
    The rest of the time react router will switch the componenet that should be displayed on the page. 

- MVC
    SailsJS: This is an MVC Framework that sits on top of expressJS. It comes with waterline and a bunch of 
    other tools. Express Proxies all api calls to the sailsjs server. 

- Authentication
    Okta: Third party auth this is an entirely seperate service. But im using their react/SPA api. 

- Dependency Injection:
   Its automatic

- Deployment:
	Deployment was interesting. I used heroku in order to deploy the servers. The issue i ran into was 
	not being able to host the sails server and react server in the same place. I had to create two dynos
	and then have them send requests to each other. One of them as a postgres instance connected to it (the sails one).
	Additional configuration was needed for both servers and okta. 
- ORM:
	Waterline JS was used as the ORM. It made the controllers really simple. The database makes its connection inside. of 
	config/datastores. And once the models are setup it allows us to access these tables as regular js objects. By using
	the waterline orm calls. 


Files Explanation:
	Client Side:
		There were a lot of changes i had to make for deployment. Youll find the react app inside of client and youll find tools/prod.js
		as the server that serves the bundle.js created from webpack. 
	Server Side:
		Youll find the sailsjs config inside of config and youll find the controllers and models inside of api. The controllers are made by adding 
		js files in api/controllers/api. Models are similar.
