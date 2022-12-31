const express = require("express");
const cors = require("cors");
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ObjectID,
} = require("mongodb");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://bikedb:p3LEXuoVpAXa04Rs@cluster0.xyxb77f.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const collection = client.db("bikedb").collection("products");
    const upcollection = client.db("bikedb").collection("upcoming");
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = collection.find(query);
      const item = await cursor.toArray();
      res.send(item);
    });
    app.get("/upcoming", async (req, res) => {
      const query = {};
      const cursor = upcollection.find(query);
      const item = await cursor.toArray();
      res.send(item);
    });
    app.post("/products", async (req, res) => {
      const add = req.body;
      console.log(add);
      const result = await collection.insertOne(add);
      res.send(result);
    });
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await collection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("bike Server Running");
});

app.listen(port, () => {
  console.log("node running");
});
