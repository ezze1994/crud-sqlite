# Node.js CRUD API with SQLite

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
![Express](https://img.shields.io/badge/express-4.x-blue)
![SQLite](https://img.shields.io/badge/sqlite-lightgrey)
![Jest](https://img.shields.io/badge/tested%20with-jest-red)

---

## Overview

REST API built with Node.js, Express, and SQLite following a clean and scalable architecture.

This project includes:

* Layered architecture (Controller, Service, Repository)
* Centralized error handling
* Reusable validation system
* Standardized API responses
* Automated testing with Jest and Supertest

> Designed as a solid backend foundation for real-world applications.

---

## Project Structure

```
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── validators/
├── middlewares/
├── config/
├── utils/
├── errors/
└── app.js

tests/
```

---

## Installation

```bash
npm install
```

---

## Run the server

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## Run tests

```bash
npm test
```

---

## API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /productos     | Create product    |
| GET    | /productos     | Get all products  |
| GET    | /productos/:id | Get product by ID |
| PUT    | /productos/:id | Update product    |
| DELETE | /productos/:id | Delete product    |

---

## Response Format

### Success

```json
{
  "success": true,
  "message": "Producto creado",
  "data": {
    "id": 1,
    "nombre": "Teclado",
    "precio": 1500
  }
}
```

### Error

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El nombre es obligatorio",
    "El precio debe ser mayor a 0"
  ]
}
```

---

## Architecture

```
Route → Controller → Service → Repository → Database
```

### Responsibilities

* **Controller** → Handles HTTP requests/responses
* **Service** → Business logic and validations
* **Repository** → Database access (SQL)
* **Validators** → Input validation rules
* **Middlewares** → Error handling and routing control

---

## Error Handling

Centralized error system using a custom error class:

```js
throw new AppError(message, statusCode, errors);
```

### Handled error types:

* Validation errors → 400
* Not found → 404
* SQLite errors → 400
* Internal server errors → 500

---

## Validation System

Validation is implemented using reusable rule-based classes:

* Required fields validation
* Numeric and positive values validation
* Easily extensible for new rules

---

## Async Handler

Avoids repetitive try/catch blocks in controllers:

```js
asyncHandler(fn)
```

Automatically forwards errors to the error middleware.

---

## Testing

This project includes integration tests using:

* Jest
* Supertest

### What is tested:

* Full CRUD functionality
* Validation errors
* HTTP responses
* Error handling

### Test database:

```
database.test.sqlite
```

Used to isolate test data from development environment.

### Cleanup:

Each test runs with a clean database state.

---

## Best Practices Applied

* Separation of concerns
* Clean architecture structure
* Centralized error handling
* Reusable validation system
* Standardized API responses
* Automated testing
* Isolated test environment

---

## Author

Lic. Valladares Ezequiel

---

## Final Note

This project focuses on clarity, maintainability, and scalability.

> “If it's easy to understand, it's easy to improve.”

---