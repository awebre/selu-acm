## Configuration

### Set up a MongoDB database

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database. In order to contribute to this project, you will first need to have MongoDB installed.
Instructions and documentation for installing and using MongoDb can be found at:

- [MongoDB Install Guide](https://docs.mongodb.com/guides/server/install/)
- [MongoDB Documentation](https://docs.mongodb.com/manual/)

### Set up Google OAuth

Follow [this tutorial](https://developers.google.com/identity/sign-in/web/sign-in) to set up a Google OAuth client. Note that the URI should be `http://localhost:3000` and the Authorized redirect URI should be `http://localhost:3000/api/auth/callback/google`.

You will need your Client ID and Client Secret for the next step.

### Set up environment variables

Create a `.env.local` file (which will be ignored by Git) and set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string (default should be `"mongodb://localhost:27017"`).
- `MONGODB_DB` - The name of the MongoDB database you want to use.
- `GOOGLE_ID` - The Google Client ID you configured for Google OAuth
- `GOOGLE_SECRET` - The Google Client Secret you configured for Google OAuth

### Run Next.js in development mode

**NOTE: THIS PROJECT USES `yarn` AS ITS PACKAGE MANAGER.**

```bash
yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!

### Data Seeding

**NOTE: SEEDING FIRST DROPS THE DATABASE. THIS IS A DESTRUCTIVE ACTION THAT CANNOT BE REVERSED**

In order to be able to test various portions of the app, you will first need to update or add to the existing seed data to include a `UserProfile` record linked to an email account that you can use with Google auth. This seed data can be found in `data/seed/userprofiles/userprofiles.js`.

You can trigger seeding via the following command:
`yarn seed`
