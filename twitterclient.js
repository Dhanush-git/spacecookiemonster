import {TwitterApi} from 'twitter-api-v2'
import 'dotenv/config'

const twitterclient = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACESS_SECRET
})

const client = twitterclient.readWrite

export default client