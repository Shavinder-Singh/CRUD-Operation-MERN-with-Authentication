const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User.js");
const Post = require("./models/Posts.js");

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Hash passwords
    const password1 = await bcrypt.hash("yyy", 10);
    const password2 = await bcrypt.hash("uuu", 10);
    const password3 = await bcrypt.hash("user123", 10);
    const password4 = await bcrypt.hash("user123", 10);
    const password5 = await bcrypt.hash("user123", 10);

    // Users data
    const usersData = [
      {
        name: "Test User",
        email: "yyy@gmail.com",
        password: password1,
        role: "user",
      },
      {
        name: "uuu",
        email: "uuu@gmail.com",
        password: password2,
        role: "admin",
      },
      {
        name: "Priya Singh",
        email: "priya@gmail.com",
        password: password3,
        role: "user",
      },
      {
        name: "Aman Kumar",
        email: "aman@gmail.com",
        password: password4,
        role: "user",
      },
      {
        name: "Simran Kaur",
        email: "simran@gmail.com",
        password: password5,
        role: "user",
      },
    ];

    // Find existing users or create new users
    const users = [];

    for (const userData of usersData) {
      let user = await User.findOne({
        email: userData.email,
      });

      if (!user) {
        user = await User.create(userData);
      }

      users.push(user);
    }

    console.log("5 users are ready");

    // Delete old sample posts created by these users
    await Post.deleteMany({
      createdBy: {
        $in: users.map((user) => user._id),
      },
    });

    // Create sample posts
    const posts = [
      {
        title: "MERN Stack Course",
        description: "Learn MongoDB, Express, React and Node.js.",
        duration: "10 Hours",
        price: 500,
        isPremium: true,
        status: "published",
        available: true,
        stock: 10,
        discount: 10,
        options: [
          {
            name: "2 Hours",
            price: 300,
            available: false,
          },
          {
            name: "4 Hours",
            price: 900,
            available: true,
          },
        ],
        createdBy: users[0]._id,
      },

      {
        title: "React Basics",
        description: "Learn React components, props and state.",
        duration: "5 Hours",
        price: 0,
        isPremium: false,
        status: "published",
        available: true,
        stock: 20,
        discount: 0,
        options: [],
        createdBy: users[1]._id,
      },

      {
        title: "Node.js Advanced",
        description: "Learn backend development with Node.js.",
        duration: "30 Days",
        price: 800,
        isPremium: true,
        status: "published",
        available: true,
        stock: 5,
        discount: 15,
        options: [
          {
            name: "Beginner Package",
            price: 400,
            available: true,
          },
          {
            name: "Advanced Package",
            price: 800,
            available: true,
          },
        ],
        createdBy: users[2]._id,
      },

      {
        title: "HTML and CSS Guide",
        description: "Learn how to create responsive websites.",
        duration: "3 Hours",
        price: 200,
        isPremium: false,
        status: "published",
        available: true,
        stock: 15,
        discount: 5,
        options: [],
        createdBy: users[3]._id,
      },

      {
        title: "JavaScript Complete Course",
        description: "Practice JavaScript fundamentals and functions.",
        duration: "15 Days",
        price: 600,
        isPremium: true,
        status: "published",
        available: true,
        stock: 8,
        discount: 20,
        options: [
          {
            name: "Basic",
            price: 300,
            available: true,
          },
          {
            name: "Complete",
            price: 600,
            available: true,
          },
          {
            name: "Pro",
            price: 1000,
            available: false,
          },
        ],
        createdBy: users[4]._id,
      },

      {
        title: "Tailwind CSS Project",
        description: "Build modern interfaces using Tailwind CSS.",
        duration: "10 Hours",
        price: 350,
        isPremium: false,
        status: "published",
        available: true,
        stock: 12,
        discount: 0,
        options: [
          {
            name: "1 Hour",
            price: 150,
            available: true,
          },
          {
            name: "3 Hours",
            price: 350,
            available: true,
          },
        ],
        createdBy: users[1]._id,
      },

      {
        title: "Express REST API",
        description: "Learn to build REST APIs using Express.",
        duration: "20 Days",
        price: 700,
        isPremium: true,
        status: "draft",
        available: true,
        stock: 6,
        discount: 10,
        options: [],
        createdBy: users[2]._id,
      },

      {
        title: "Git and GitHub",
        description: "Learn version control and GitHub basics.",
        duration: "2 Hours",
        price: 250,
        isPremium: false,
        status: "published",
        available: false,
        stock: 0,
        discount: 0,
        options: [],
        createdBy: users[3]._id,
      },
    ];

    await Post.insertMany(posts);

    console.log("8 sample posts created successfully");
    console.log("5 users are ready");
    console.log("Test login:");
    console.log("Email: yyy@gmail.com");
    console.log("Password: yyy");
  } catch (error) {
    console.log("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();