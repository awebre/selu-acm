const path = require("path");
const { Seeder } = require("mongo-seeding");

const config = {
  database: "mongodb://localhost:27017/selu-acm", //ideally this wouldn't be duplicated with the env file
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
