How to run:

1. npm run build
2. npm run start, then use liveserver host at 5050 (important because access control allow origin header is set to this port for development)
3. npm run start-backend - keep in mind you're rate limited, everytime you restart the app it does x amount of calls to the instagram api depending on how many posts you have. also the long lived [access_token](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens) needs to be rotated every 60 days 


