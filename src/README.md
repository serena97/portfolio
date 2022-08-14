How to run:

1. npm run build
2. npm run start which starts a server at 5500 (important because access control allow origin header is set to this port for development)
3. npm run start-backend - keep in mind you're rate limited, everytime you restart the app it does x amount of calls to the instagram api depending on how many posts you have. also the long lived [access_token](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens) needs to be rotated every 60 days 

To rotate access_token:
run `ngrok http 5050` and update the instagram basic display Valid OAuth Redirect URIs (dev purposes only)
