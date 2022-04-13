## Purpose

This is a project I am currently working on, with the end goal of having a repo that contains all of the infrastructure of a SaaS app implemented in a way where it can be cloned, and the "guts" of the app can easily be ripped out. (E.G: The "guts" of this app allows marketers to build uniform tracking links. But, it could be cloned and the dashboard could do something completely different, and the DB could easily be switched over without having to start from scratch.

## How to Use

- Run Git Clone of this repo locally and rename it using the following command.

`git clone <repo_ssh> <name_of_the_new_repo>`

- CD into the new repo

- Run npm i to install all of the dependencies

- Create a new MongoDB Database & Collection via MongoDB Atlas

    - Give the Collection the name "users".

- Open the repo and update the .env.local

    - Update the MONGODB_URI string with the new DB Name

    - Update MONGODB_DB with the new DB Name

- Create a new Auth0 application & Update the .env.local file

    - Update the AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, & AUTH0_CLIENT_SECRET that you get from Auth0

    - Within Auth0, go to Authentication > Database and click "+ Create DB Connection".

    - Once created, go into that new DB Connection and go to the "Custom Database" tab.

    - Turn on "Use my own database"

    - Then, customize the Database Action Scripts for all of the various requests. (Hint: You can select a MongoDB Template from the drop-down on the right-hand side of the embedded code-editor.)

    - You'll want to change the const client to something like the following

    `const client = new MongoClient('mongodb+srv://mknowlton-admin:'+configuration.MONGO_PASSWORD+'@cluster0.hfcgv.mongodb.net/utmGenerator?retryWrites=true&w=majority');`

    Then, you'll want to change the DB name on line 9, and the collection name on line 10.

- Run 'npm run dev' and see if you're seeing "You are connected to MongoDB" on localhost:3000

- Click the "Login" button and create a new account. After creating that account, the button should now say "Logout".

- Go to the DB you created and double check the new user is there.

- You can also go to localhost:3000/user and look in the console to see the Auth0 user object, and a custom API call via MongoDB & Axios.

## Additional Documentation

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy your own

Once you have access to the environment variables you'll need, deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb&project-name=with-mongodb&repository-name=with-mongodb&env=MONGODB_URI&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-mongodb with-mongodb-app
# or
yarn create next-app --example with-mongodb with-mongodb-app
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb&project-name=with-mongodb&repository-name=with-mongodb&env=MONGODB_URI,MONGODB_DB&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB)
