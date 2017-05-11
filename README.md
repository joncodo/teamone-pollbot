# Poll bot

KEY=xxxxx ORG_ID=23343 node app.js

Create a bot user:

POST https://app.intellinote.net/rest/v2/bot?org_id=23343

{"given_name": "Math", "family_name": "Bot","job_title": "Lets talk math!."}

response:

{
    "user_id": "user33468",
    "user_uuid": "xxx",
    "api_token": "xx",
    "api_token_uuid": "xxx"
}


## Set up on heroku

10410  heroku create
10411  heroku config:set orgId=23343 botToken=xxx
10412  git push heroku master
