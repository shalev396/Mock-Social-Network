# API Documentation

## Base URL

http://85.250.87.24:3006

## Authentication

All protected routes require a JWT token in the Authorization header:
`Authorization: Bearer <token>`

# User Endpoints

### 1. Create User (Sign Up)

- **Method:** POST
- **URL:** `/api/users/signup`
- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "birthday": "date",
  "phoneNumber": "string",
  "profilePic": "string (optional)"
}
```

- **Response (201):**

```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "profilePic": "string",
  "birthday": "date",
  "phoneNumber": "string",
  "following": [],
  "followers": []
}
```

### 2. Login User

- **Method:** POST
- **URL:** `/api/users/login`
- **Body:**

```json
{
  "username": "string (username/email/phoneNumber)",
  "password": "string"
}
```

- **Response (200):**

```json
{
  "message": "Login successful",
  "token": "jwt_token_string",
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string",
    "profilePic": "string",
    "following": [],
    "followers": []
  }
}
```

- **Error Response (401):**

```json
{
  "message": "Login credentials are invalid"
}
```

### 3. Verify Unique Fields

- **Method:** POST
- **URL:** `/api/users/verify`
- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "phoneNumber": "string"
}
```

- **Response (200):**

```json
{
  "Unique": true
}
```

- **Error Response (400):**

```json
{
  "Unique": false,
  "details": {
    "username": boolean,
    "email": boolean,
    "phoneNumber": boolean
  }
}
```

### 4. Get Self

- **Method:** GET
- **URL:** `/api/users/self`
- **Authentication:** Required
- **Response (200):**

```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "profilePic": "string",
  "birthday": "date",
  "phoneNumber": "string",
  "following": ["userId"],
  "followers": ["userId"]
}
```

### 5. Search Users by Username

- **Method:** GET
- **URL:** `/api/users/search/:username`
- **Authentication:** Required
- **Response (200):**

```json
[
  {
    "_id": "string",
    "username": "string",
    "profilePic": "string",
    "following": ["userId"],
    "followers": ["userId"]
  }
]
```

### 6. Get User by ID

- **Method:** GET
- **URL:** `/api/users/:id`
- **Authentication:** Required
- **Response (200):**

```json
{
  "_id": "string",
  "username": "string",
  "profilePic": "string",
  "following": ["userId"],
  "followers": ["userId"]
}
```

### 7. Edit User Profile

- **Method:** POST
- **URL:** `/api/users/edit`
- **Authentication:** Required
- **Body:**

```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "phoneNumber": "string (optional)",
  "profilePic": "string (optional)",
  "bio": "string (optional)"
}
```

- **Response (200):**

```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "phoneNumber": "string",
  "profilePic": "string",
  "bio": "string",
  "following": ["userId"],
  "followers": ["userId"]
}
```

- **Error Response (500):**

```json
{
  "message": "Internal server error"
}
```

### 8. Follow/Unfollow User

- **Method:** POST
- **URL:** `/api/users/follow/:id`
- **Authentication:** Required
- **Params:**
  - id: ID of user to follow/unfollow
- **Response (200):**

```json
{
  "me": {
    "_id": "string",
    "username": "string",
    "following": ["userId"],
    "followers": ["userId"]
  },
  "him": {
    "_id": "string",
    "username": "string",
    "following": ["userId"],
    "followers": ["userId"]
  }
}
```

- **Error Response (500):**

```json
{
  "message": "Internal server error"
}
```

# Post Endpoints

### 1. Create Post

- **Method:** POST
- **URL:** `/api/posts`
- **Authentication:** Required
- **Body:**

```json
{
  "content": "string",
  "image": "string (optional)",
  "location": "string (optional)"
}
```

- **Response (201):**

```json
{
  "_id": "string",
  "content": "string",
  "image": "string",
  "location": "string",
  "author": {
    "_id": "string",
    "username": "string",
    "profilePic": "string"
  },
  "likes": [],
  "createdAt": "date",
  "updatedAt": "date"
}
```

### 2. Like/Unlike Post

- **Method:** POST
- **URL:** `/api/posts/like/:id`
- **Authentication:** Required
- **Params:**
  - id: Post ID to like/unlike
- **Response (200):**

```json
{
  "_id": "string",
  "likes": ["userId"],
  "likesCount": "number"
}
```

- **Error Response (404):**

```json
{
  "message": "Post not found"
}
```

### 3. Get Posts from Followed Users

- **Method:** GET
- **URL:** `/api/posts/followed`
- **Authentication:** Required
- **Response (200):**

```json
[
  {
    "_id": "string",
    "content": "string",
    "image": "string",
    "location": "string",
    "author": {
      "_id": "string",
      "username": "string",
      "profilePic": "string"
    },
    "likes": ["userId"],
    "likesCount": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### 4. Get Posts by User ID

- **Method:** GET
- **URL:** `/api/posts/user/:id`
- **Authentication:** Required
- **Params:**
  - id: User ID whose posts to retrieve
- **Response (200):**

```json
[
  {
    "_id": "string",
    "content": "string",
    "image": "string",
    "location": "string",
    "author": {
      "_id": "string",
      "username": "string",
      "profilePic": "string"
    },
    "likes": ["userId"],
    "likesCount": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### 5. Get Single Post

- **Method:** GET
- **URL:** `/api/posts/:id`
- **Authentication:** Required
- **Params:**
  - id: Post ID to retrieve
- **Response (200):**

```json
{
  "_id": "string",
  "content": "string",
  "image": "string",
  "location": "string",
  "author": {
    "_id": "string",
    "username": "string",
    "profilePic": "string"
  },
  "likes": ["userId"],
  "likesCount": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

- **Error Response (404):**

```json
{
  "message": "Post not found"
}
```

### 6. Get All Posts

- **Method:** GET
- **URL:** `/api/posts`
- **Authentication:** Required
- **Response (200):**

```json
[
  {
    "_id": "string",
    "content": "string",
    "image": "string",
    "location": "string",
    "author": {
      "_id": "string",
      "username": "string",
      "profilePic": "string"
    },
    "likes": ["userId"],
    "likesCount": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

- **Error Response (500):**

```json
{
  "message": "Internal server error"
}
```

# Comment Endpoints

### 1. Create Comment

- **Method:** POST
- **URL:** `/api/comments`
- **Authentication:** Required
- **Body:**

```json
{
  "content": "string",
  "postId": "string"
}
```

- **Response (201):**

```json
{
  "_id": "string",
  "content": "string",
  "author": {
    "_id": "string",
    "username": "string",
    "profilePic": "string"
  },
  "post": "string",
  "likes": [],
  "likesCount": 0,
  "createdAt": "date",
  "updatedAt": "date"
}
```

- **Error Response (400):**

```json
{
  "message": "Content and postId are required"
}
```

### 2. Like/Unlike Comment

- **Method:** POST
- **URL:** `/api/comments/like/:id`
- **Authentication:** Required
- **Params:**
  - id: Comment ID to like/unlike
- **Response (200):**

```json
{
  "_id": "string",
  "likes": ["userId"],
  "likesCount": "number"
}
```

- **Error Response (404):**

```json
{
  "message": "Comment not found"
}
```

### 3. Get Comments by Post ID

- **Method:** GET
- **URL:** `/api/comments/post/:id`
- **Authentication:** Required
- **Params:**
  - id: Post ID to get comments for
- **Response (200):**

```json
[
  {
    "_id": "string",
    "content": "string",
    "author": {
      "_id": "string",
      "username": "string",
      "profilePic": "string"
    },
    "post": "string",
    "likes": ["userId"],
    "likesCount": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

- **Error Response (404):**

```json
{
  "message": "Post not found"
}
```

- **Error Response (500):**

```json
{
  "message": "Internal server error"
}
```
