const express = require("express");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome Tou Prisma, Express And PSQL Tutorial");
});

app.get("/posts", async (req, res) => {
  try {
    const blogs = await prisma.post.findMany();
    return res.status(201).json({ data: blogs.length, blogs });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching blogs" });
  }
});

app.post("/post", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please input Title Anc Content" });
    }
    const blog = await prisma.post.create({
      data: { title, content },
    });

    return res
      .status(201)
      .json({ message: "Blog created successfully", data: blog });
  } catch (error) {
    return res.status(500).json({ message: "Error creating blog" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
