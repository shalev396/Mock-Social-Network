# **Mock Social Network Project Requirements**

# Mobile First - Instagram Inspired

## **1. Project Description**

Build a mock social network application where users can:

1. "Sign up" and "log in" with just a display name and email (no real authentication).
2. View a list of posts.
3. View and add comments to individual posts.
4. Create new posts.

This project includes both a **React frontend** and a **Node.js backend**, focusing on RESTful APIs and frontend-backend integration, with MongoDB for data persistence.

---

## **2. Functional Requirements**

### **Frontend Features**

1. **Fake Signup and Login**:
   - **Signup**:
     - Users can register by providing a display name and email.
     - Store the entered user data in the backend as a new user.
     - Automatically treat the user as "logged in" after signup.
   - **Login**:
     - Users can log in by entering their email.
     - Fetch the user data from the backend based on the email.
     - If the email doesn’t exist, show an error.
   - **Session Simulation**:
     - Persist the "logged-in" user data in localStorage for session simulation.
     - On app reload, restore the user session from localStorage.
2. **Logout**:
   - Provide a “Logout” button to clear user data from localStorage and redirect to the login page.
3. **Homepage**:
   - Display a list of all posts.
   - Show the logged-in user’s display name in the navigation bar.
   - Provide a “Create Post” button to navigate to the post creation form.
4. **Post Details Page**:
   - Display the full content of a post.
   - Show all associated comments.
   - Allow users to add comments.
5. **Create Post Page**:
   - Provide a form for creating a new post.
   - Ensure only a logged-in user can create posts (checked on the frontend).

---

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

---

## **3. Technical Requirements**

### **Frontend**

1. **React**:
   - Routes for `/signup`, `/login`, `/`, `/post/:postId`, `/add-post`.
   - Simulate session persistence using localStorage.
2. **State Management**:
   - Use `useState` or `useContext` to manage user state and app data.
3. **Validation**:
   - Validate user input (e.g., non-empty display name and email format) before sending data to the backend.

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

---

## **4. Functional Routes**

### **Frontend Routes**

1. **Public Routes**:
   - `/signup`: Signup page.
   - `/login`: Login page.
2. **General Routes**:
   - `/`: Homepage (list of posts).
   - `/post/:postId`: Post details page.
   - `/add-post`: Create post page.

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

---

## **5. Deliverables**

1. **Frontend**:
   - A React app with:
     - Mock signup and login functionality.
     - LocalStorage-based session simulation.
     - Features for viewing, adding, and interacting with posts and comments.
2. **Backend**:
   - A Node.js backend with:
     - RESTful APIs for users, posts, and comments.
     - Data persistence using MongoDB.

---

## **6. Stretch Goals**

1. **User Profile**:
   - Add a page showing the user’s posts and comments.
2. **Search Functionality**:
   - Add a search bar to filter posts by title or content.

---

This setup emphasizes simplicity while providing opportunities for students to practice CRUD operations and basic frontend-backend communication. Let me know if you need further tweaks!
