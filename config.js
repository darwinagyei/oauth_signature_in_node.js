const Config = {
    consumer_key: process.env.CONSUMER_KEY,
    token: process.env.BOT_TOKEN,
    base_url: 'https://api.twitter.com/2/tweets',
    method: 'POST',
    consumer_secret: process.env.CONSUMER_SECRET,
    token_secret: process.env.BOT_TOKEN_SECRET,
}

export default Config;