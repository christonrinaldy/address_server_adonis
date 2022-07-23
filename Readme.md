1. create .env file
    PORT=
    HOST=
    NODE_ENV=
    APP_KEY=
    DRIVE_DISK=

    DB_CONNECTION=
    REDIS_PORT=
    REDIS_CONNECTION=
    REDIS_HOST=
    REDIS_PASSWORD=

    PG_HOST=
    PG_PORT=
    PG_USER=
    PG_PASSWORD=
    PG_DB_NAME=

    SECRET=

2. This project is using PostgeSQL
   so please create the database first and copy the name to .env file on PG_DB_NAME
3. This project is using Redis to save the addresses values
   please fill the value for REDIS congiguration on .env file
4. on terminal on project's folder and execute npm start
5. to get token for authentication for requesting to api, 
   1. On API Platform
      request to 
      url: http://localhost:[YOUR_PORT]/login
      method: POST
      body: {
         "username": "admin",
         "password": "password"
      }
      response: {
         token: string
      }

