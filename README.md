# Full Stack Recipe Management System

A robust web application designed for managing and sharing recipes, utilizing modern technologies and best practices to deliver a seamless user experience.

## Features

- **CRUD Operations for Recipes**: Full control over recipe creation, editing, deletion, and viewing
- **Image Upload and Management**: Integrated with Cloudinary for efficient image storage and manipulation
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on both mobile and desktop devices
- **RESTful API with Swagger Documentation**: Interactive and comprehensive API documentation for developers
- **Database Management with Prisma ORM**: Leveraging Prisma for efficient and type-safe database interactions

## Backend

Built with Node.js and Express.js, our backend provides a robust and scalable foundation.

### Key Components

- **Database**: MongoDB is used for flexible, document-based storage, with Prisma ORM ensuring type-safe interactions and efficient queries
- **Authentication**: JWT for secure user sessions
- **Image Handling**: CloudCloudinary integration allows for efficient image storage, transformation, and delivery.
- **API Documentation**: Swagger UI provides clear and interactive API documentation, making it easier for developers to understand and test the API endpoints

### Running the Server

```bash
    cd server
    npm install
    npm run dev
```

## Tests

### Default Route Test

The `default.test.ts` file contains unit tests for the default route of the application. It uses Jest as the testing framework and Supertest for making HTTP requests.

#### Test Suite: Default Route

This test suite focuses on the behavior of the default route ("/").

- **Setup**:

  - Creates an instance of `DefaultRoute`
  - Initializes the `App` with the default route

- **Test Case**: Fetching the root route "/"
  - Sends a GET request to "/"
  - Expects:
    1. HTTP status code 200
    2. Response body to be a string

### Category Tests

1. **Create Category**

   - Sends a POST request to `/api/category` with a category title
   - Expects:
     - Status code 201
     - Correct response body with category details
     - Success message "category created successfully"

2. **Fetch All Categories**
   - Sends a GET request to `/api/category`
   - Expects:
     - Status code 201
     - Correct response body with all categories
     - Success message "All categories fetched successfully"

#### Setup:

- Mocks CategoryService
- Creates a new App instance with CategoryRoute
- Clears mocks before each test

#### Teardown:

- Closes the server after all tests

### Recipe Route Tests

### Endpoints Tested

1. **Create Recipe** (`POST /api/recipes`)

   - Verifies successful recipe creation
   - Checks response status, body structure, and data integrity

2. **Fetch All Recipes** (`GET /api/recipes`)

   - Ensures all recipes are retrieved correctly
   - Validates response status and data matching

3. **Delete Recipe** (`DELETE /api/recipes/:id`)

   - Confirms successful recipe deletion
   - Checks response status and deleted recipe data

4. **Update Recipe** (`PUT /api/recipes/:id`)

   - Tests recipe update functionality
   - Verifies response status and updated recipe details

5. **Fetch Recipe by ID** (`GET /api/recipes/:id`)
   - Ensures a single recipe is fetched correctly
   - Validates response status and recipe data integrity

### Setup

- Mocks the RecipeService
- Creates a new App instance with RecipeRoute
- Clears all mocks before each test

### Running the Tests

To run these tests, use the following command:

```bash
    cd server
    npm run test

```

### API Documentation

Explore our comprehensive API documentation: [Swagger UI](https://remote-assessment.onrender.com/swagger)

### Deployment

Backend is deployed at: [https://remote-assessment.onrender.com/api/](https://remote-assessment.onrender.com/api)

## Frontend

The frontend is developed with Next.js, offering server-side rendering for enhanced performance and SEO

### Note on Initial Load Time

When accessing the application for the first time or after a period of inactivity, you may experience a brief delay. This is due to the hosting platform's sleep mode, which is activated during periods of inactivity to conserve resources. The application needs a moment to "wake up" and initialize.

**Why this happens:**

- The free tier of our hosting service puts the application to sleep after a period of inactivity.
- When a new request comes in, the server needs time to start up and load the application into memory.
- This can result in a delay of 10-30 seconds on the first request.

**What to do:**

- Please be patient during the initial load. The application is not hanging; it's simply warming up.
- Refresh the page if it takes longer than 30 seconds.
- Subsequent requests will be much faster once the application is running.

We appreciate your understanding as we balance performance with cost-effective hosting solutions.

#### Recipe App E2E Tests

This file contains end-to-end tests for the Recipe App using Cypress.

##### Test Suite Structure

The tests are organized within a `describe` block titled "Recipe App E2E Tests".

###### Setup

Before each test:

- Visits the app at `http://localhost:3000`

### Tests

1. **Opening Recipe Modal**

   - Clicks the "Add Recipe" button
   - Verifies the recipe modal becomes visible

2. **Populating Recipe Modal**
   - Opens the recipe modal
   - Fills in the following fields:
     - Title: "Test Recipe"
     - Description: "Test Recipe"
     - Ingredients: Two steps
     - Instructions: Two steps

## Running Cypress Tests

To run the Cypress tests for this project:

1. Open a terminal in the project's root directory.
2. execute the following command.

```bash
    cd client
    np run dev
```

3. Open a new terminal in the project's root directory.
4. Execute the following command:

```bash
   cd client
   npx cypress open
```

5. In the Cypress GUI:
   - Select "E2E Testing"
   - Choose either Chrome or Edge as your preferred browser
   - Click on the `spec.cy.ts` file in the list of specs
6. The tests will automatically run in the selected browser.

## Key Points

- Uses `data-testid` attributes for element selection
- Demonstrates basic Cypress commands: `visit`, `get`, `click`, `should`, `type`
- Verifies both UI interactions and form input functionality

### Key Features

- **Responsive Design**: Tailwind CSS ensures a seamless experience across all devices, from mobile to desktop
- **Intuitive User Interface**: Easy-to-use features like drag-and-drop for reordering ingredients and instructions
- **Dynamic Form Handling**: Real-time form validation and error messaging for a smooth user experience
- **Image Upload Integration**: Cloudinary seamlessly handles image uploads, providing efficient storage and transformation capabilities
- **Server-Side Rendering (SSR)**: Next.js improves initial load times and SEO performance
- **State Management**: Efficient use of React hooks for clean and maintainable state management
- **Search and Filter**: Quick recipe lookup with dynamic search and category filtering
- **Lazy Loading**: Optimized performance with lazy loading of images and components

### Running the Client

```bash
    cd client
    npm install --legacy-peer-deps
    npm run dev
```

Client runs on port 3000.

### Deployment

Frontend is deployed at: [https://remote-assessment.vercel.app/](https://remote-assessment.vercel.app/)

## Conclusion

This Full Stack Recipe Management System demonstrates the effective use of modern web development technologies, including Next.js, Prisma ORM, Tailwind CSS, and Cloudinary. The system is designed to be scalable, secure, and user-friendly, with a focus on performance and best practices. Whether you are managing a small personal recipe collection or building a large-scale application, this system provides a strong foundation and is ready for further enhancements.
