# Full-Stack MERN Boilerplate
# (VITE + REACT)

This is a boilerplate project for building a full-stack web application using the MERN stack (MongoDB, Express, React, Node.js).

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js
- MongoDB

## Getting Started

1. Clone the branch of your choice. Replace the `main` with branch name.
```bash
git clone --single-branch -b main git@github.com:moeez-ktk/MERN-Boilerplate.git
```

2. Navigate to the server directory and install dependencies:
```bash
cd server
npm install
npm i dotenv
```

3. Edit the `.env` file in the server directory and modify the following environment variables:

`PORT = <port-of-your-choice>`

`MONGO_URI = <your-mongodb-uri>`


4. Start the backend server development environment by entering in following command in CLI while being in server directory:

```bash
npm run dev
```

for production environment:

```bash
npm start
```

5. Open a new terminal window, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```


6. Start the frontend development server:

```bash
npm run dev
```

7. Open your web browser and visit `http://localhost:5173` to access the application.

## Directory Structure

- `client`: Frontend client directory containing React components and stylesheets.
- `server`: Backend server directory containing Express routes, controllers, middleware, and database configuration.

## Changes Required After Completing Setup

The server side has dummy routes and models. You will need to change it according to your requirements.

For example if you are making an e-commerce web app, you will make the following changes:

- In the `models` folder add files such as `productModel.js` , `customerModel.js` etc. Outline of how a model is made is given in the `postModel.js` file.

- In the `routes` folder add files such as `productRoutes.js`, `customerRoutes.js` etc. `productRoutes.js` will should include all the api routes related to products, the `customerRoutes.js` should include all the customer related routes. Outline of how a routes file should be made is given in the `postRoutes.js` file.

- In the `controllers` folder all the implementations of APIs should be written. Example: `productController.js` would include the implementations of the api routes written in the `productRoutes.js` file. Outline of how a controller file should be made is given in the `postController.js` file.

- The middleware folder is made and has some middlewares commented out. Use middlewares based on your API request and response data requirements.

- Finally modify the index.js file to include the middlewares (if any) and import the routes created.

Congratulations! your project is now complete and you have successfully created a fullstack MERN web application.