# API Endpoints Documentation

## Base URL

http://85.250.87.24:3006

## Authentication

### JWT Token Format

The API uses JWT (JSON Web Token) for authentication. Tokens are provided upon login and should be included in subsequent requests.

#### Token Location

1. Authorization Header:

   ```javascript
   headers: {
      Authorization: "Bearer <your_jwt_token>",
    };
   ```

2. Cookie (httpOnly):

- Name: 'jwt'
- Max Age: 1 hour
- Secure: true (in production)
- SameSite: strict

### Cookie Configuration

```javascript
  {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000 // 1 hour
  }
```

## User Endpoints

### 1. Create User

- **Method:** POST
- **URL:** `/api/users/signup`
- **Description:** Creates a new user account
- **Authentication:** None required
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
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "profilePic": "https://example.com/pic.jpg",
    "id": "123456789"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Verify Unique Fields

- **Method:** POST
- **URL:** `/api/users/verify`
- **Description:** Checks if username, email, and phone number are unique
- **Authentication:** None required
- **Body Requirements:**

```json
{
  "username": "String (optional)",
  "email": "String (optional)",
  "phoneNumber": "String (optional)"
}
```

- **Response Example:**

```json
{
  "Unique": false,
  "details": {
    "username": true,
    "email": false,
    "phoneNumber": true
  }
}
```

### 3. Login User

- **Method:** POST
- **URL:** `/api/users/login`
- **Description:** Authenticates user and returns JWT token
- **Authentication:** None required
- **Body Requirements:**

```json
{
  "username": "String (can be username, email, or phoneNumber)",
  "password": "String"
}
```

- **Response Example:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456789",
    "username": "john_doe",
    "email": "john@example.com",
    "profilePic": "https://example.com/pic.jpg"
  }
}
```

## Posts Endpoints

### 1. Create Post

- **Method:** POST
- **URL:** `/api/posts`
- **Description:** Creates a new post
- **Authentication:** Required
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
  "id": "987654321",
  "createdAt": "2024-03-15T12:00:00.000Z"
}
```

### 2. Get All Posts

- **Method:** GET
- **URL:** `/api/posts`
- **Description:** Retrieves all posts with their first comments
- **Authentication:** Required
- **Response Example:**

```json
[
  {
    "title": "Post 1",
    "content": "Content 1",
    "media": "https://example.com/image1.jpg",
    "authorId": {
      "username": "john_doe",
      "email": "john@example.com",
      "profilePic": "https://example.com/pic.jpg"
    },
    "likes": [],
    "commentsCount": 0,
    "id": "987654321",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "firstComment": {
      "_id": "commentId",
      "text": "First comment",
      "createdAt": "2024-03-15T12:01:00.000Z",
      "author": {
        "username": "jane_doe",
        "profilePic": "https://example.com/jane.jpg"
      }
    }
  }
]
```

### 3. Get Post by ID

- **Method:** GET
- **URL:** `/api/posts/:id`
- **Description:** Retrieves a specific post by ID
- **Authentication:** Required
- **Response Example:**

```json
{
  "title": "Post 1",
  "content": "Content 1",
  "media": "https://example.com/image1.jpg",
  "authorId": {
    "username": "john_doe",
    "email": "john@example.com"
  },
  "likes": [],
  "commentsCount": 0,
  "id": "987654321",
  "createdAt": "2024-03-15T12:00:00.000Z"
}
```

## Comments Endpoints

### 1. Create Comment

- **Method:** POST
- **URL:** `/api/comments`
- **Description:** Creates a new comment on a post
- **Authentication:** Required
- **Body Requirements:**

```json
{
  "postId": "String",
  "text": "String",
  "authorId": "String"
}
```

- **Response Example:**

```json
{
  "postId": "987654321",
  "text": "Great post!",
  "authorId": "123456789",
  "likes": [],
  "id": "456789123",
  "createdAt": "2024-03-15T12:00:00.000Z"
}
```

### 2. Get Comments by Post ID

- **Method:** GET
- **URL:** `/api/comments/post/:id`
- **Description:** Retrieves all comments for a specific post
- **Authentication:** Required
- **Response Example:**

```json
[
  {
    "postId": "987654321",
    "text": "Comment 1",
    "authorId": "123456789",
    "likes": [],
    "id": "456789123",
    "createdAt": "2024-03-15T12:00:00.000Z"
  }
]
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
