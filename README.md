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

### API Documentation

Explore our comprehensive API documentation: [Swagger UI](https://remote-assessment.onrender.com/swagger)

### Deployment

Backend is deployed at: [https://remote-assessment.onrender.com/api/](https://remote-assessment.onrender.com/api)

## Frontend

The frontend is developed with Next.js, offering server-side rendering for enhanced performance and SEO

### Key Features

- **Server-Side Rendering (SSR)**: Improved performance and SEO benefits with Next.js
- **Responsive Design**: Tailwind CSS is utilized for modern, responsive design, ensuring a consistent look and feel across devices
- **State Management**: React hooks are used for efficient and clean state management throughout the application
- **Form Handling and Validation**: Robust form handling and validation, ensuring data integrity and user-friendly experiences

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
