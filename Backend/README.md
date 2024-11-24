## **Project Description**

Build a mock social network application where users can:

1. "Sign up" and "log in" with just a display name and email (no real authentication).
2. View a list of posts.
3. View and add comments to individual posts.
4. Create new posts.

This project includes both a **React frontend** and a **Node.js backend**, focusing on RESTful APIs and frontend-backend integration, with MongoDB for data persistence.

## Functional Requirements

### **Backend Features**

1. **Users API**:
   - POST `/users/signup`: Create a new user with a display name and email.
     - Validate that the email is unique.
     - Return the created user object.
   - POST `/users/login`: Fetch the user by email.
     - If the user exists, return their data.
     - If the user doesn’t exist, return an error.
2. **Posts API**:
   - GET `/posts`: Retrieve all posts.
   - GET `/posts/:postId`: Retrieve a specific post and its associated comments.
   - POST `/posts`: Add a new post (title, content, and authorId required).
3. **Comments API**:
   - GET `/comments/post/:postId`: Retrieve all comments for a specific post.
   - POST `/comments`: Add a new comment to a post (postId, text, and authorId required).
4. **Data Persistence**:
   - MongoDB collections for:
     - **Users**: `{ _id, displayName, email }`
     - **Posts**: `{ _id, title, content, authorId }`
     - **Comments**: `{ _id, postId, text, authorId }`

## Technical Requirements

### **Backend**

1. **Fake Authentication**:
   - No password or session management.
   - Simply store and retrieve user data from the database.
2. **Data Handling**:
   - Handle basic CRUD operations for users, posts, and comments using Mongoose.
3. **API Endpoints**:
   - Users:
     - POST `/users/signup`: Save new user data to MongoDB.
     - POST `/users/login`: Find a user by email and return their data.
   - Posts:
     - GET `/posts`: Retrieve all posts from MongoDB.
     - GET `/posts/:postId`: Retrieve a single post and populate its comments.
     - POST `/posts`: Add a new post to MongoDB.
   - Comments:
     - GET `/comments/post/:postId`: Retrieve comments for a specific post.
     - POST `/comments`: Add a new comment to MongoDB.

## Functional Routes

### **Backend API Endpoints**

1. **Users**:
   - POST `/users/signup`: Register a new user with a display name and email.
   - POST `/users/login`: Retrieve user data by email.
2. **Posts**:
   - GET `/posts`: Retrieve all posts.
   - GET `/posts/:postId`: Retrieve a single post and its comments.
   - POST `/posts`: Add a new post.
3. **Comments**:
   - GET `/comments/post/:postId`: Retrieve all comments for a specific post.
   - POST `/comments`: Add a new comment.

## Deliverables

2. **Backend**:
   - A Node.js backend with:
     - RESTful APIs for users, posts, and comments.
     - Data persistence using MongoDB.

## **Stretch Goals**

1. **User Profile**:
   - Add a page showing the user’s posts and comments.
2. **Search Functionality**:
   - Add a search bar to filter posts by title or content.
