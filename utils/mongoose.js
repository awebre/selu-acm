import mongoose from "mongoose";
const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

//Would like a better place for this side effect to occur
mongoose.ObjectId.get((v) => v?.toString());

const connection = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
}

const withDb = (handler) => async (req, res) => {
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error connecting to database.");
  }

  return handler(req, res);
};

export { dbConnect as default, withDb };
