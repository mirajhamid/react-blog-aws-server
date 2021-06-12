import express from "express";
//this is to read body data when using post
import bodyParser from "body-parser";

const app = express();
//here we gonna use the parser to read the request body with the any path
app.use(bodyParser.json());
//mock articleInfo data
const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: [],
  },
};

app.get("/hello", (req, res) => res.send("hello"));
app.get("/hello/:name", (req, res) => res.send(`hello ${req.params.name}`));
app.post("/hello", (req, res) => res.send(`hello ${req.body.name}`));
app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;
  res
    .status(200)
    .send(
      `Aricle ${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`
    );
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const articleName = req.params.name;

  //reading json body parameters
  const { userName, commentText } = req.body;

  //add a new object for comments array based on the req
  articlesInfo[articleName].comments.push({ userName, commentText });

  res.status(200).send(articlesInfo[articleName]);
});

app.listen(8000, () => console.log("listening to port 8000"));
