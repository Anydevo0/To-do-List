# To-Do List Application

This is a simple To-Do List application built using **Node.js**, **Express**, and **MongoDB**. It allows users to create custom to-do lists and manage tasks efficiently.

## Features

- Add tasks to the default or a custom to-do list
- Create separate to-do lists using custom URLs
- Delete tasks from any list
- Persistent data storage using MongoDB

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/To-do-List.git
cd To-do-List
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Setup MongoDB Connection

- Replace the MongoDB connection string in `app.js`:
  ```js
  mongoose.connect("your_mongodb_connection_string", { useNewUrlParser: true });
  ```

### 4. Run the Application

```sh
node app.js
```

### 5. Open in Browser

Go to: [http://localhost:3000](http://localhost:3000)

## Usage

- Add a task by entering text and clicking **Add**.
- Create a custom list by navigating to `http://localhost:3000/customListName`.
- Delete a task by clicking the checkbox next to it.
- Delete a custom list by visiting `http://localhost:3000/customListName/delete`. 
