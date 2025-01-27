#User Management Dashboard
--------------------------------------------------------------------------------------------------------------------
Project Setup Instructions

Clone the Repository:

git clone <repository-url>
cd <repository-directory>

Install Dependencies:
Ensure that Node.js and npm are installed on your system, then run:

npm install

Run the JSON Server:
The project uses json-server as a mock backend. To set it up:

npx json-server --watch db.json --port 5000

Ensure the db.json file is in the project root directory and contains sample user data, e.g.,

{
  "users": []
}

Start the React Application:
Run the following command to start the development server:

npm start

This will start the application on http://localhost:3000/.
-----------------------------------------------------------------------------------------------------------------------------------
Component Details

Home.js:

Displays a list of users fetched from the JSON Server.

Provides options to edit or delete users.

CreateUser.js:

Handles adding a new user.

Includes a form to input details such as firstName, lastName, email, and department.

Submits data to the JSON Server via axios.

UpdateUser.js:

Handles updating an existing user.

Fetches the user's current details and allows editing.

Sends updates to the JSON Server via axios.

App.js:

Sets up the routing using react-router-dom.

Routes include:

/: Home page

/adduser: Add a user

/users/:id: Update a user

---------------------------------------------------------------------------------------------------------------
Challenges Faced

Unique ID Generation:

Initially, new Date() was used for ID generation, which worked but lacked uniqueness for rapid successive requests.

Switched to a combination of Date.now() and Math.random() for better uniqueness.

Navigate in Class Components:

Encountered issues using useNavigate in class-based components since hooks are exclusive to functional components.

Resolved this by creating a wrapper component to pass the navigate prop.

Styling for Responsive Design:

Ensuring forms looked good on both mobile and desktop views required extra effort.

Used responsive CSS classes (w-90, w-md-70) to adapt form width dynamically.

Error Handling:

Handling errors for API calls required implementing try-catch blocks to show appropriate messages.
