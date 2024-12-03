const API_BASE_URL = "http://localhost:3006/api";
//un note this^
// Dummy data arrays
const dummyUsers = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    birthday: "1990-01-01",
    phoneNumber: "+1234567890",
    profilePic: "https://picsum.photos/200",
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
    birthday: "1992-05-15",
    phoneNumber: "+1234567891",
    profilePic: "https://picsum.photos/201",
  },
  {
    username: "bob_wilson",
    email: "bob@example.com",
    password: "password123",
    birthday: "1988-12-25",
    phoneNumber: "+1234567892",
    profilePic: "https://picsum.photos/202",
  },
  {
    username: "alice_brown",
    email: "alice@example.com",
    password: "password123",
    birthday: "1995-07-30",
    phoneNumber: "+1234567893",
    profilePic: "https://picsum.photos/203",
  },
  {
    username: "charlie_davis",
    email: "charlie@example.com",
    password: "password123",
    birthday: "1993-03-20",
    phoneNumber: "+1234567894",
    profilePic: "https://picsum.photos/204",
  },
];

// Function to create dummy posts
const createDummyPosts = (userIds) => {
  return Array(10)
    .fill()
    .map((_, index) => ({
      title: `Post ${index + 1}`,
      content: `This is the content for post ${
        index + 1
      }. Lorem ipsum dolor sit amet.`,
      media: `https://picsum.photos/${300 + index}`,
      authorId: userIds[Math.floor(Math.random() * userIds.length)],
    }));
};

// Function to create dummy comments
const createDummyComments = (userIds, postIds) => {
  return Array(20)
    .fill()
    .map((_, index) => ({
      postId: postIds[Math.floor(Math.random() * postIds.length)],
      authorId: userIds[Math.floor(Math.random() * userIds.length)],
      text: `This is comment ${index + 1}. Very interesting post!`,
    }));
};

// Main function to populate the database
async function populateDatabase() {
  try {
    console.log("Starting database population...");

    // Create users
    console.log("Creating users...");
    const createdUsers = await Promise.all(
      dummyUsers.map((user) => axios.post(`${API_BASE_URL}/users/signup`, user))
    );
    const userIds = createdUsers.map((response) => response.data._id);
    console.log("Users created successfully");

    // Create posts
    console.log("Creating posts...");
    const dummyPosts = createDummyPosts(userIds);
    const createdPosts = await Promise.all(
      dummyPosts.map((post) => axios.post(`${API_BASE_URL}/posts`, post))
    );
    const postIds = createdPosts.map((response) => response.data._id);
    console.log("Posts created successfully");

    // Create comments
    console.log("Creating comments...");
    const dummyComments = createDummyComments(userIds, postIds);
    await Promise.all(
      dummyComments.map((comment) =>
        axios.post(`${API_BASE_URL}/comments`, comment)
      )
    );
    console.log("Comments created successfully");

    console.log("Database population completed successfully!");
  } catch (error) {
    console.error("Error populating database:", error.message);
    if (error.response) {
      console.error("Error details:", error.response.data);
    }
  }
}

// Run the population script
populateDatabase();
