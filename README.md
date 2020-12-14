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
    other tools.

- Authentication
    Okta: Third party auth this is an entirely seperate service. But im using their react/SPA api. 