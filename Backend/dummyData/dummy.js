const API_BASE_URL = "http://localhost:3006/api";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dnnifnoyf/upload";
const CLOUDINARY_UPLOAD_PRESET = "Mock-Social-Network-Preset"; // Set this up in your Cloudinary settings

class DummyDataGenerator {
  constructor() {
    this.mediaFiles = [];
    this.profilePics = [];
    this.dummyData = null;
    this.setupEventListeners();
  }

  async generateDummyData(config) {
    try {
      // Generate users first (now async)
      const users = await this.generateUsers(config.userCount);
      if (!Array.isArray(users)) {
        throw new Error("Failed to generate users");
      }

      // Generate posts for each user (now async)
      const posts = await this.generatePosts(users, config.postsPerUser);
      if (!Array.isArray(posts)) {
        throw new Error("Failed to generate posts");
      }

      // Generate comments
      const comments = this.generateComments(
        users,
        posts,
        config.commentsPerUser
      );

      // Generate likes for posts and comments
      const { postLikes, commentLikes } = this.generateLikes(
        users,
        posts,
        comments,
        config
      );

      // Assign the data to this.dummyData first
      this.dummyData = {
        users,
        posts,
        comments,
        postLikes,
        commentLikes,
      };

      // Now distribute comments and generate likes
      // Distribute comments across posts
      this.dummyData.comments.forEach((comment, index) => {
        // Assign each comment to a post in a round-robin fashion
        const postIndex = index % this.dummyData.posts.length;
        comment.postId = this.dummyData.posts[postIndex];
      });

      // Generate post likes
      this.dummyData.postLikes = [];
      this.dummyData.commentLikes = [];

      this.dummyData.posts.forEach((post) => {
        // Each post gets 1-3 random likes
        const numLikes = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numLikes; i++) {
          const randomUserIndex = Math.floor(
            Math.random() * this.dummyData.users.length
          );
          this.dummyData.postLikes.push({
            userId: this.dummyData.users[randomUserIndex],
            postId: post,
          });
        }
      });

      // Generate comment likes
      this.dummyData.comments.forEach((comment) => {
        // Each comment gets 0-2 random likes
        const numLikes = Math.floor(Math.random() * 3);
        for (let i = 0; i < numLikes; i++) {
          const randomUserIndex = Math.floor(
            Math.random() * this.dummyData.users.length
          );
          this.dummyData.commentLikes.push({
            userId: this.dummyData.users[randomUserIndex],
            commentId: comment,
          });
        }
      });

      return {
        users,
        posts,
        comments,
        postLikes: this.dummyData.postLikes,
        commentLikes: this.dummyData.commentLikes,
      };
    } catch (error) {
      console.error("Error generating dummy data:", error);
      throw error;
    }
  }

  setupEventListeners() {
    document
      .getElementById("configForm")
      .addEventListener("submit", (e) => this.handleFormSubmit(e));
    document
      .getElementById("exportBtn")
      .addEventListener("click", () => this.exportJSON());
    document
      .getElementById("importBtn")
      .addEventListener("click", () =>
        document.getElementById("importFile").click()
      );
    document
      .getElementById("importFile")
      .addEventListener("change", (e) => this.importJSON(e));
    document
      .getElementById("saveToDb")
      .addEventListener("click", () => this.saveToDatabase());
    document
      .getElementById("postMedia")
      .addEventListener("change", (e) => this.handleMediaUpload(e));
    document
      .getElementById("profilePics")
      .addEventListener("change", (e) => this.handleProfilePicsUpload(e));
  }

  async handleMediaUpload(event) {
    this.mediaFiles = Array.from(event.target.files);
  }

  async handleProfilePicsUpload(event) {
    this.profilePics = Array.from(event.target.files);
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    try {
      const config = {
        userCount: parseInt(document.getElementById("userCount").value) || 1,
        postsPerUser:
          parseInt(document.getElementById("postsPerUser").value) || 1,
        commentsPerUser:
          parseInt(document.getElementById("commentsPerUser").value) || 1,
        postLikesPerUser:
          parseInt(document.getElementById("postLikesPerUser").value) || 0,
        commentLikesPerUser:
          parseInt(document.getElementById("commentLikesPerUser").value) || 0,
      };

      this.dummyData = await this.generateDummyData(config);
      this.updatePreview(this.dummyData);
    } catch (error) {
      console.error("Error handling form submit:", error);
      alert("Error generating dummy data. Check console for details.");
    }
  }

  async generateUsers(count) {
    // Add timestamp to make usernames unique
    const timestamp = Date.now();

    // Upload profile pictures first
    const uploadedProfilePics = await Promise.all(
      this.profilePics.map((pic) => this.uploadToCloudinary(pic))
    );

    return Array(count)
      .fill()
      .map((_, i) => ({
        _id: `temp_user_${i + 1}`,
        username: `user_${i + 1}_${timestamp}`,
        email: `user${i + 1}_${timestamp}@example.com`,
        password: "password123",
        birthday: this.randomDate(),
        phoneNumber: this.generatePhoneNumber(),
        profilePic:
          uploadedProfilePics[i % uploadedProfilePics.length] ||
          `https://picsum.photos/200?random=${i}`,
      }));
  }

  async generatePosts(users, postsPerUser) {
    const uploadedMedia = await Promise.all(
      this.mediaFiles.map((media) => this.uploadToCloudinary(media))
    );

    return users.flatMap((user, userIndex) =>
      Array(postsPerUser)
        .fill()
        .map((_, postIndex) => ({
          content: `Post ${postIndex + 1} by ${user.username}`,
          media:
            uploadedMedia[postIndex % uploadedMedia.length] ||
            `https://picsum.photos/400/300?random=${
              userIndex * postsPerUser + postIndex
            }`,
          authorId: user._id,
        }))
    );
  }

  generateComments(users, posts, commentsPerUser) {
    return users.flatMap((user) =>
      Array(commentsPerUser)
        .fill()
        .map(() => ({
          text: `Comment by ${user.username}: ${this.generateLoremIpsum()}`,
          postId: posts[Math.floor(Math.random() * posts.length)],
          authorId: user,
        }))
    );
  }

  generateLikes(users, posts, comments, config) {
    const postLikes = [];
    const commentLikes = [];

    users.forEach((user) => {
      // Get posts not created by this user
      const availablePosts = posts.filter(
        (post) => post.author.toString() !== user._id.toString()
      );
      const availableComments = comments.filter(
        (comment) => comment.author.toString() !== user._id.toString()
      );

      // Randomly select posts to like
      const selectedPosts = this.getRandomElements(
        availablePosts,
        config.likesPerUser
      );
      selectedPosts.forEach((post) => {
        postLikes.push({
          user: user._id,
          post: post._id,
        });
      });

      // Randomly select comments to like
      const selectedComments = this.getRandomElements(
        availableComments,
        config.likesPerUser
      );
      selectedComments.forEach((comment) => {
        commentLikes.push({
          user: user._id,
          comment: comment._id,
        });
      });
    });

    return { postLikes, commentLikes };
  }

  // Helper function to get random unique elements from an array
  getRandomUniqueElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  }

  randomDate() {
    const start = new Date(1990, 0, 1);
    const end = new Date(2005, 0, 1);
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .toISOString()
      .split("T")[0];
  }

  generatePhoneNumber() {
    return `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
  }

  generateLoremIpsum() {
    const words = [
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipiscing",
      "elit",
    ];
    return Array(10)
      .fill()
      .map(() => words[Math.floor(Math.random() * words.length)])
      .join(" ");
  }

  async saveToDatabase() {
    if (!this.dummyData) return;

    try {
      console.log("Starting database population...");
      const userTokens = new Map();
      const userIdMap = new Map();
      const postIdMap = new Map();
      const commentIdMap = new Map();

      // Create users and store their tokens
      console.log("Creating users...");
      const createdUsers = await Promise.all(
        this.dummyData.users.map(async (user) => {
          // First signup the user
          const signupResponse = await axios.post(
            `${API_BASE_URL}/users/signup`,
            {
              username: user.username,
              email: user.email,
              password: user.password,
              birthday: user.birthday,
              phoneNumber: user.phoneNumber,
              profilePic: user.profilePic,
            }
          );

          // Then login to get the token
          const loginResponse = await axios.post(
            `${API_BASE_URL}/users/login`,
            {
              username: user.username,
              password: user.password,
            }
          );

          const token = loginResponse.data.token;
          const realUserId = signupResponse.data._id;
          userTokens.set(realUserId, token);
          userIdMap.set(user._id, realUserId); // Map temp ID to real ID
          return { ...signupResponse, token };
        })
      );

      // Create posts with authentication
      console.log("Creating posts...");
      const createdPosts = await Promise.all(
        this.dummyData.posts.map(async (post) => {
          // Check if authorId is an object or string
          const authorTempId =
            typeof post.authorId === "object"
              ? post.authorId._id
              : post.authorId;
          const realUserId = userIdMap.get(authorTempId);
          const token = userTokens.get(realUserId);

          if (!token) {
            console.error("Post:", post);
            console.error("AuthorId:", authorTempId);
            console.error("UserIdMap:", Object.fromEntries(userIdMap));
            throw new Error(`Missing token for user ${realUserId}`);
          }

          const response = await axios.post(
            `${API_BASE_URL}/posts`,
            {
              title: post.content.substring(0, 50),
              content: post.content,
              media: post.media,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          postIdMap.set(post._id, response.data._id);
          return response.data;
        })
      );

      // Store post IDs for comments
      postIdMap.clear(); // Clear existing entries
      createdPosts.forEach((post, index) => {
        const tempPostId = this.dummyData.posts[index]._id;
        const realPostId = post._id;
        postIdMap.set(tempPostId, realPostId);
      });

      // Create comments with authentication
      console.log("Creating comments...");
      const createdComments = await Promise.all(
        this.dummyData.comments.map(async (comment) => {
          const realUserId = userIdMap.get(comment.authorId._id);
          const realPostId = postIdMap.get(comment.postId._id);
          const token = userTokens.get(realUserId);

          if (!token || !realPostId) {
            throw new Error(
              `Missing data for comment: token=${!!token}, postId=${!!realPostId}`
            );
          }

          const response = await axios.post(
            `${API_BASE_URL}/comments`,
            {
              text: comment.text,
              postId: realPostId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          // Store the mapping
          commentIdMap.set(comment._id, response.data._id);
          return response.data;
        })
      );

      // Create post likes
      console.log("Creating post likes...");
      await Promise.all(
        this.dummyData.postLikes.map(async (like) => {
          const realUserId = userIdMap.get(like.userId._id);
          const realPostId = postIdMap.get(like.postId._id);
          const token = userTokens.get(realUserId);

          if (!token || !realPostId) {
            throw new Error(
              `Missing data for post like: token=${!!token}, postId=${!!realPostId}`
            );
          }

          return axios.post(
            `${API_BASE_URL}/posts/like/${realPostId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        })
      );

      // Create comment likes
      console.log("Creating comment likes...");
      await Promise.all(
        this.dummyData.commentLikes.map(async (like) => {
          const realUserId = userIdMap.get(like.userId._id);
          const realCommentId = commentIdMap.get(like.commentId._id);
          const token = userTokens.get(realUserId);

          if (!token || !realCommentId) {
            throw new Error(
              `Missing data for comment like: token=${!!token}, commentId=${!!realCommentId}`
            );
          }

          return axios.post(
            `${API_BASE_URL}/comments/like/${realCommentId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        })
      );

      console.log("Database population completed successfully!");
    } catch (error) {
      console.error("Error populating database:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
    }
  }

  updatePreview(data) {
    const previewSection = document.getElementById("previewSection");
    previewSection.innerHTML = `
      <div class="mb-4">
        <h4>Users (${data.users.length})</h4>
        <pre>${JSON.stringify(data.users, null, 2)}</pre>
      </div>
      <div class="mb-4">
        <h4>Posts (${data.posts.length})</h4>
        <pre>${JSON.stringify(data.posts, null, 2)}</pre>
      </div>
      <div class="mb-4">
        <h4>Comments (${data.comments.length})</h4>
        <pre>${JSON.stringify(data.comments, null, 2)}</pre>
      </div>
      <div class="mb-4">
        <h4>Post Likes (${data.postLikes.length})</h4>
        <pre>${JSON.stringify(data.postLikes, null, 2)}</pre>
      </div>
      <div class="mb-4">
        <h4>Comment Likes (${data.commentLikes.length})</h4>
        <pre>${JSON.stringify(data.commentLikes, null, 2)}</pre>
      </div>
    `;
  }

  exportJSON() {
    if (!this.dummyData) return;
    const dataStr = JSON.stringify(this.dummyData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "dummy-data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  async importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        this.dummyData = JSON.parse(e.target.result);
        this.updatePreview(this.dummyData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  }

  async uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      // Return a fallback URL if upload fails
      return `https://picsum.photos/400/300?random=${Math.random()}`;
    }
  }
}

// Initialize the generator
new DummyDataGenerator();
