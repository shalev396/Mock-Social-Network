# API Endpoints Documentation

## Base URL

http://85.250.87.24:3006

## Users Endpoints

### 1. Create User

- **POST** `/api/users`
- **Body Requirements:**
  ```json
  {
    "username": "String (unique)",
    "email": "String (unique)",
    "password": "String",
    "birthday": "Date",
    "phoneNumber": "String (unique)",
    "profilePic": "String (optional)"
  }
  ```
- **Response Example:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "profilePic": "https://example.com/pic.jpg",
    "bio": "",
    "followers": [],
    "following": [],
    "isPublic": true,
    "_id": "123456789",
    "createdAt": "2024-03-15T12:00:00.000Z"
  }
  ```

### 2. Login User

- **POST** `/api/users/login`
- **Body Requirements:**
  ```json
  {
    "username": "String (can be username, email, or phoneNumber)",
    "password": "String"
  }
  ```
- **Response:** Returns user object if credentials are valid

## Posts Endpoints

### 1. Create Post

- **POST** `/api/posts`
- **Body Requirements:**
  ```json
  {
    "title": "String",
    "content": "String",
    "media": "String (URL)",
    "authorId": "String"
  }
  ```
- **Response Example:**
  ```json
  {
    "title": "My Post",
    "content": "Post content",
    "media": "https://example.com/image.jpg",
    "authorId": "123456789",
    "likes": [],
    "commentsCount": 0,
    "_id": "987654321",
    "createdAt": "2024-03-15T12:00:00.000Z"
  }
  ```

### 2. Get All Posts

- **GET** `/api/posts`
- **Response:** Array of post objects

### 3. Get Post by ID

- **GET** `/api/posts/:id`
- **Response:** Single post object

## Comments Endpoints not yet implemented

### 1. Get Comments for Post

- **GET** `/api/comments/post/:postId`
- **Response:** Array of comments for specified post

### 2. Create Comment

- **POST** `/api/comments`
- **Body Requirements:**
  ```json
  {
    "postId": "String",
    "text": "String",
    "authorId": "String"
  }
  ```

## Extra Features (Stretch Goals)

### Posts

- **GET** `/api/posts/:userid` - Get posts by user
- **GET** `/api/posts/:keywords` - Search posts
- **DELETE** `/api/posts/:id` - Delete post
- **PUT** `/api/posts/report/:id` - Report post

### Users

- **GET** `/api/users/followers/:userid` - Get user followers
- **GET** `/api/users/following/:userid` - Get user following

### Comments

- **DELETE** `/api/comments/:id` - Delete comment
- **PUT** `/api/comments/report/:id` - Report comment

### Stories

- **GET** `/api/stories` - Get stories from last 24 hours
- **GET** `/api/stories/:id` - Get specific story
- **POST** `/api/stories` - Create new story
- **DELETE** `/api/stories/:id` - Delete story
- **PUT** `/api/stories/report/:id` - Report story
