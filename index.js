import fetch from 'node-fetch';
import client from './twitterclient.js';
import cron from 'cron'

var CronJob = cron.CronJob

const wakeUpTweet = async() =>{
    try {
        await client.v1.tweet("Looks like I woke up from a long sleep 👨‍🚀")
    } catch (error) {
        console.log(error)
    }
}

const tweet = async() =>{
    try {
        const data = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY").then((data)=>{return data.json()})
        const imgBuffer = await fetch(data.hdurl).then((res)=>{return res.arrayBuffer()})
        const mediaId = await client.v1.uploadMedia(Buffer.from(imgBuffer),{mimeType: 'jpg'});
        await client.v1.tweet(data.title+"\ncredits: "+data.copyright+"\n#NASA #space",{ media_ids: mediaId })
    } catch (error) {
        console.log(error)
    }
}

var sendTweetJob = new CronJob('0 0 * * *',()=>{
    console.log("job triggered");
    tweet()
},{sheduled:true,timezome:'Asia/Kolkata'})


sendTweetJob.start()
