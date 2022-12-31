require('dotenv').config()

const snoowrap = require('snoowrap')

const newAccount = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.NEW_USERNAME,
  password: process.env.NEW_PASSWORD,
})

const sourceAccount = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.SOURCE_USERNAME,
  password: process.env.SOURCE_PASSWORD,
})

async function main() {
  const sourceSubscriptions = await sourceAccount
    .getSubscriptions({ limit: Infinity })
    .catch((err) => console.log(err))

  // loop through each sourceSubscription
  for (let i = 0; i < sourceSubscriptions.length; i++) {
    const subName = sourceSubscriptions[i].display_name

    await newAccount
      .getSubreddit(subName)
      .subscribe()
      .catch((err) => console.log(err))

    console.log(`Subscribed to ${subName}`)
  }
}

main()
