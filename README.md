A simple Travel Tour Booking API built with Node.js, Express, MongoDB, and Swagger for API documentation. This application allows users to Create, Read, Update, and Delete (CRUD) tour 
bookings.

📌 Features
✅ Get All Tours – Fetch all available tour details.
✅ Create a New Tour – Add a new tour to the database.
✅ Update a Tour – Modify existing tour details.
✅ Delete a Tour – Remove a tour from the database.
✅ API Documentation – Integrated with Swagger.
✅ Error Handling & Validation – Proper error responses for invalid data.

Technologies Used
Node.js - Backend runtime environment
Express.js - Web framework for Node.js
MongoDB + Mongoose - NoSQL Database for storing tours
Swagger - API documentation
Express Validator - Input validation
CORS - Allowing cross-origin requests

Clone the Repository
https://github.com/05912Shivani/fullstack-project-travel.git

Install Dependencies
npm install

Create a .env file
MONGO_URI=your_mongodb_connection_string
PORT=3000

npm start
node server.js
Server will run on: http://localhost:3000

API Documentation
Swagger Docs available at:
👉 http://localhost:3000/api-docs

I have used Swagger UI documentation and you can also test the code on POSTMAN

 API Endpoints
 Method    	Endpoint	    Description
 GET	         /tour	      Get all tours
 GET	        /tour/:id	    Get a specific tour
 POST	        /tour        	Create a new tour
 PUT	       /tour/:id	    Update an existing tour
 DELETE	    /tour/:id	      Delete a tour

 You can see the full project here:
 Frontend:https://fullstack-project-travel-1.onrender.com
 Backend:https://fullstack-project-travel.onrender.com/tour
 SwaggerUI:https://fullstack-project-travel.onrender.com/api-docs/


