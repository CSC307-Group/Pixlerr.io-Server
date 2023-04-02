# Pixlerr.io Server
A server system that communicates with the Pixlerr.io app's frontend using websockets and HTTP requests.  
Also backs up data to a remote MongoDB Atlas database.  
Built by Cameron McGiffert, Seena Abed, Jun Liang, and Reed Marohn. 

### How to use
Clone this repository to a local machine.  

Create a `.env` file in the root directory, and set the following environment variables:
* `COOKIE_SECRET`: Any long random character string
* `FRONTEND_URL`: The URL of the frontend Pixlerr.io application.  If running locally, should be http://localhost:3000.
* `MONGODB_URI`: The URI of the remote MongoDB Atlas database to store pixler and user info in.  URI should include your database's username, password, cluster name, and database name.  

Then run the following command in the project's root directiory:
```npm install```    

Once packages are installed, run the following command:
```npm start```    
