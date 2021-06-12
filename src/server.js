import express from "express";
//this is to read body data when using post
import bodyParser from "body-parser";
//using mongo client
import { MongoClient } from "mongodb";

const app = express();
//here we gonna use the parser to read the request body with the any path
app.use(bodyParser.json());

const dbpw = "test123";
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
//
// app.post("/api/articles/:name/upvote", (req, res) => {
//   const articleName = req.params.name;
//   articlesInfo[articleName].upvotes += 1;
//   res
//     .status(200)
//     .send(
//       `Aricle ${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`
//     );
// });

//This is a common connection component written to connect to db
const withDB = async (operations, res) => {
  try {
    const uri = `mongodb+srv://blog-user-mj:${dbpw}@miraj-cluster.mblki.mongodb.net/react-blog-aws?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const db = client.db("react-blog-aws");

    //will return to the calling function
    await operations(db);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
};

//updating data using common db connection config
app.post("/api/articles-withdb-common/:name/upvote", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    //find info
    const articleInfo = await db
      .collection("articlesInfo")
      .findOne({ name: articleName });

    //update info
    await db.collection("articlesInfo").updateOne(
      { name: articleName },
      {
        $set: {
          upvote: articleInfo.upvote + 1,
        },
      }
    );

    const updatedArticleInfo = await db
      .collection("articlesInfo")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);
  }, res);
});

//updating data using onfly db connection config
app.post("/api/articles/:name/upvote", async (req, res) => {
  try {
    const articleName = req.params.name;
    const uri = `mongodb+srv://blog-user-mj:${dbpw}@miraj-cluster.mblki.mongodb.net/react-blog-aws?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const db = client.db("react-blog-aws");
    //find info
    const articleInfo = await db
      .collection("articlesInfo")
      .findOne({ name: articleName });

    //update info
    await db.collection("articlesInfo").updateOne(
      { name: articleName },
      {
        $set: {
          upvote: articleInfo.upvote + 1,
        },
      }
    );

    const updatedArticleInfo = await db
      .collection("articlesInfo")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

// app.post("/api/articles/:name/add-comment", (req, res) => {

//   const articleName = req.params.name;

//   //reading json body parameters
//   const { userName, commentText } = req.body;

//   //add a new object for comments array based on the req
//   articlesInfo[articleName].comments.push({ userName, commentText });

//   res.status(200).send(articlesInfo[articleName]);
// });

app.post("/api/articles/:name/add-comment", async (req, res) => {
  try {
    const articleName = req.params.name;

    //reading json body parameters
    const { userName, commentText } = req.body;
    const uri = `mongodb+srv://blog-user-mj:${dbpw}@miraj-cluster.mblki.mongodb.net/react-blog-aws?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const db = client.db("react-blog-aws");
    //find info
    const articleInfo = await db
      .collection("articlesInfo")
      .findOne({ name: articleName });

    //update info
    await db.collection("articlesInfo").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ userName, commentText }),
        },
      }
    );

    const updatedArticleInfo = await db
      .collection("articlesInfo")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

// using proper promise
// app.post("/api/articles-mongodb-onfly/:name", async (req, res) => {
//   const articleName = req.params.name;
//   const uri =
//     "mongodb+srv://blog-user-mj:<pw>@miraj-cluster.mblki.mongodb.net/react-blog-aws?retryWrites=true&w=majority";
//   const client = MongoClient.connect(
//     uri,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     async function (err, client) {
//       if (err) {
//         console.error("db error" + err);
//         throw err;
//       } else {
//         console.log("db connected");
//         const db = client.db("react-blog-aws");
//         const articlesInfo = await db
//           .collection("articlesInfo")
//           .findOne({ name: articleName });
//         console.log(articlesInfo);
//         res.status(200).send(articlesInfo);
//       }
//     }
//   );
// });

app.post("/api/articles-mongodb-onfly/:name", async (req, res) => {
  try {
    const articleName = req.params.name;
    const uri = `mongodb+srv://blog-user-mj:${dbpw}@miraj-cluster.mblki.mongodb.net/react-blog-aws?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const db = client.db("react-blog-aws");
    const articleInfo = await db
      .collection("articlesInfo")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.listen(8000, () => console.log("listening to port 8000"));
