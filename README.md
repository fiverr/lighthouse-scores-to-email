# lighthouse-scores-to-email [![](https://user-images.githubusercontent.com/516342/75164343-59cb6900-5729-11ea-80f1-392b57445ab2.png)](https://hub.docker.com/r/fiverr/lighthouse-scores-to-email) [![](https://circleci.com/gh/fiverr/lighthouse-scores-to-email.svg?style=svg)](https://circleci.com/gh/fiverr/lighthouse-scores-to-email)

Get [Lighthouse scoring](https://developers.google.com/web/tools/lighthouse/v3/scoring) via [Google PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) delivered to your email.

| ![](https://user-images.githubusercontent.com/516342/75387150-8dee8780-58eb-11ea-8780-a359edabe262.png)
| -

## Configurations

Add email and general configurations to `/configuration/config.js`
Add pages configurations to `/configuration/pages.json`

<details>
<summary>Example configuration files</summary>
<br>

> #### configuration/pages.json
> ```json
> {
>   "Search Page" : "https://www.google.com",
>   "Start Page" : "https://www.start.co.il"
> }
> ```


> #### configuration/config.json
> ```json
> {
>   "email": {
>    "to": "t-800@google.com",
>    "authUser": "admin@skynet.net",
>  "authPassword": "<INSERT_GOOGLE_APP_PASSWORD_HERE>"
>  },
>  "lightHouseApiKey": "<INSERT_PAGESPEED_API_KEY_HERE>"
>}
>```

</details>

To load configurations during run time from external file, use docker volume.
```
-v "$(pwd)"/pages.json:/usr/src/app/configuration/pages.json
```

## getting-started with Docker

```
docker pull fiverr/lighthouse-scores-to-email:latest
```

Export your variables to the environment and pass them through alongside your pages.json file
```
docker run fiverr/lighthouse-scores-to-email:latest \
  -v "$(pwd)"/pages.json:/usr/src/app/configuration/pages.json \
  -e AUTH_USER \
  -e AUTH_PASSWORD \
  -e EMAIL_TO \
  -e APIKEY \
  --name crazy-speedtest
```

Or send as config file
```
docker run fiverr/lighthouse-scores-to-email:latest \
  -v "$(pwd)"/pages.json:/usr/src/app/configuration/pages.json \
  -v "$(pwd)"/pages.json:/usr/src/app/configuration/config.json \
  --name crazy-speedtest
```

## Get your credentials here

Get your [PageSpeed API key](https://developers.google.com/speed/docs/insights/v4/first-app).

Use Gmail with Google's [app passwords](https://support.google.com/accounts/answer/185833).

<img width="400" src="https://user-images.githubusercontent.com/516342/74944673-0c848a00-53ff-11ea-888c-457f16bdb1b9.png">

## Set up environment variables or configuration using config file

| Env Variable | Config File path | Value | Example | Default
| - | - | - | - | -
| `APIKEY` | `lightHouseApiKey` | SpeedTest [API Key](https://developers.google.com/speed/docs/insights/v4/first-app) | __Mandatory__
| `AUTH_USER` | `email.authUser` | Email username | __Mandatory__
| `AUTH_PASSWORD` | `email.authPassword` | [App password](https://support.google.com/accounts/answer/185833) | __Mandatory__
| `EMAIL_TO` | `email.to` | Recipient Email address | __Mandatory__
| `EMAIL_FROM` | `email.from` | Sender Email address | `Lighthouse Gazette <reporter@the-lighthouse-gazette.com>`
| `EMAIL_SUBJECT` | `email.subject` | Subject of the email | `Google LightHouse Report ✔`
| `HOST` | `email.host` | SMTP host | `smtp.gmail.com`
| `PORT` | `email.port` | SMTP port | `465`
| `SECURE` | `email.secure` | Should use SSL | `true`
| - | `categories` | Lighthouse categories | `['performance', 'seo', 'accessibility', 'best-practices']`
| - | `strategies` | Lighthouse strategies | `['mobile', 'desktop']`
