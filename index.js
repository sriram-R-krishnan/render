const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const mongodb = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const dbUrl = "mongodb+srv://swathy:Swathy1996@cluster0.lvwbu.mongodb.net/passwordReset?retryWrites=true&w=majority";

const client = new MongoClient(dbUrl);
const port = 3001;

// getting all users information
app.get("/", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  console.log("connected");
  try {
    const db = await client.db("user_management");

    let users = await db.collection("All Accounts").find().toArray();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", error });
  } finally {
    client.close();
  }
});

// creating new user
app.post("/createUser", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("user_management");
    await db.collection("All Accounts").insertOne(req.body);
    res
      .status(201)
      .send({ message: "User Registartion Successful", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", error });
  } finally {
    client.close();
  }
});

// updating user information
// app.put("/updateuser/:email", async (req, res) => {
//   const client = await MongoClient.connect(dbUrl);
//   try {
//     if (req.params.email) {
//       const db = await client.db("user_management");
//       let user = await db
//         .collection("All Accounts")
//         .findOne({ email: req.params.email });
//       if (user) {
//         db
//           .collection("All Accounts")
//           .updateOne({ email: req.params.email }, { $set: req.body });
//         res.status(200).send({ message: "User info updated successfully" });
//       } else {
//         res
//           .status(400)
//           .send({ message: `User not found with email ${user}` });
//       }
//     } else {
//       res.status(400).send({ message: "email is mandatory" });
//     }
//   } catch (error) {
//     res.status(400).send({ message: "Internal server error", error });
//   } finally {
//     client.close();
//   }
// });

// deleting user account
// app.delete("/deleteUser/:email", async (req, res) => {
//   const client = await MongoClient.connect(dbUrl);
//   try {
//     if (req.params.email) {
//       const db = await client.db("user_management");
//       let user = await db
//         .collection("All Accounts")
//         .findOne({ email: req.params.email });
//       if (user) {
//         let user = await db
//           .collection("All Accounts")
//           .deleteOne({ email: req.params.email });
//         res.status(200).send({ message: "User deleted successfully" });
//       } else {
//         res
//           .status(400)
//           .send({ message: `User not found with email ${req.params.email}` });
//       }
//     } else {
//       res.status(400).send({ message: "email is mandatory" });
//     }
//   } catch (error) {
//     res.status(400).send({ message: "Internal server error", error });
//   } finally {
//     client.close();
//   }
// });

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
