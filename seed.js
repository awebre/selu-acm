const path = require("path");
const { Seeder } = require("mongo-seeding");

//Hydates process.env with config explicitely because this is a mini node.js app
//so we have to do that stuff ourselves
require("dotenv").config({ path: ".env.local" });
const { MONGODB_URI, MONGODB_DB } = process.env;
console.log(`connection url: ${MONGODB_URI}`);
console.log(`database: ${MONGODB_DB}`);

const config = {
  database: `${MONGODB_URI}/${MONGODB_DB}`,
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("data/seed"), {
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});
console.log(collections);

seeder
  .import(collections)
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log("Error", err);
  });
