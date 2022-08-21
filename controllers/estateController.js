const asyncHandler = require("express-async-handler");
var Twitter = require('twitter');

const getEstate = asyncHandler(async (req, res, next) => {
    try {
        var client = new Twitter({
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_API_KEY_SECRET,
            access_token_key: process.env.TWITTER_API_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
        });

        const estates = await client.get('statuses/user_timeline', {
            screen_name: "realestate"
        });
        const userData = await client.get('users/show.json', {
            screen_name: "realestate"
        })
        
        res.status(200).send({userData: userData, estates: estates})
    } catch (error) {
        console.log(error.message);
        next(error)
    }
    
});


module.exports = { getEstate };