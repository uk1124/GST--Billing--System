# GST Billing System

A GST Billing System built with Node.js, Express.js, React, and MySQL. This system allows users to manage categories, products, and sales with integrated GST calculations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Schema Definition](#schema-definition)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)

## Features

- Manage Categories (Add, View)
- Manage Products (Add, View)
- Record Sales with GST Calculation
- Real-time updates on Sales and Billing

## Tech Stack

- Backend: Node.js, Express.js, Sequelize ORM
- Frontend: JavaScript (ES6+), HTML5, CSS3
- Database: MySQL

## Schema Definition

```sql
CREATE TABLE Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gstRate FLOAT NOT NULL
);

CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    categoryId INT,
    FOREIGN KEY (categoryId) REFERENCES Category(id)
);

CREATE TABLE Sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    quantity INT NOT NULL,
    totalPrice FLOAT NOT NULL,
    gstAmount FLOAT NOT NULL,
    FOREIGN KEY (productId) REFERENCES Product(id)
);
```

## Installation

### Backend Installation

**1. Clone the Repository:**

```bash
git clone https://github.com/uk1124/Railway-Management-System.git
```

**2. Navigate to the Backend Directory:**

```bash
cd backend
```

**3. Install Dependencies:**

```bash
npm install
```

**4. Set Up the MySQL Database:**

- Ensure MySQL is running.

- Create the database:

```sql
CREATE DATABASE gst_billing;
```

### Frontend Installation

**1. Navigate to the Frontend Directory:**

```bash
cd frontend
```

**2. Install Dependencies:**

```bash
npm install
```

## Running the Project

### Start Backend Server

**1. Start the Server:**

```bash
node index.js
```

**2. Backend Server will run on: http://localhost:3000**

### Start Frontend Server

**1.Start the Frontend Server**

```
Run your index.html file
```

**2. Frontend Server will run on: http://localhost:5501**

## API Endpoints

Use Postman or cURL to test the endpoints (details below).

### Categories

#### (i) Get All Categories

- Endpoint: GET /api/categories

- Response:

  ```json
  [
    {
      "id": 1,
      "name": "Category 1",
      "gstRate": 18
    },
    {
      "id": 2,
      "name": "Category 2",
      "gstRate": 12
    }
  ]
  ```

#### (ii) Get Category by ID

- Endpoint: GET /api/categories/:id

- Response:

  ```json
  {
    "id": 1,
    "name": "Category 1",
    "gstRate": 18
  }
  ```

#### (iii) Add New Category

- Endpoint: POST /api/categories

- Body:

  ```json
  {
    "name": "New Category",
    "gstRate": 15
  }
  ```

  - Response:

  ```json
  {
    "id": 3,
    "name": "New Category",
    "gstRate": 15
  }
  ```

### Products

#### (i) Get All Products

- Endpoint: GET /api/products

- Response:

  ```json
  [
    {
      "id": 1,
      "name": "Product 1",
      "price": 100,
      "categoryId": 1,
      "Category": {
        "id": 1,
        "name": "Category 1",
        "gstRate": 18
      }
    },
    {
      "id": 2,
      "name": "Product 2",
      "price": 200,
      "categoryId": 2,
      "Category": {
        "id": 2,
        "name": "Category 2",
        "gstRate": 12
      }
    }
  ]
  ```

#### (ii) Get Product by ID

- Endpoint: GET /api/products/:id

- Response:

  ```json
  {
    "id": 1,
    "name": "Product 1",
    "price": 100,
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Category 1",
      "gstRate": 18
    }
  }
  ```

#### (iii) Add New Product

- Endpoint: POST /api/products

- Body:

```json
{
  "name": "New Product",
  "price": 150,
  "categoryId": 3
}
```

- Response:

```json
{
  "id": 3,
  "name": "New Product",
  "price": 150,
  "categoryId": 3
}
```

### Sale

#### (i) Record a Sale

- Endpoint: POST /api/sales

- Body:

```json
{
  "productId": 1,
  "quantity": 5
}
```

- Response:

```json
{
  "id": 1,
  "productId": 1,
  "quantity": 5,
  "totalPrice": 500,
  "gstAmount": 90
}
```
