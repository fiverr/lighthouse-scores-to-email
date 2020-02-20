# lighthouse-scores-to-email

| ![](https://user-images.githubusercontent.com/516342/74950240-7dc83b00-5407-11ea-8ef8-bd7bfb37ce6b.png)
| -

## Configurations

Add email and general configurations to `/configuration/config.js`
Add pages configurations to `/configuration/pages.json`

To load configurations during run time from external file, use docker volume.
`-v "$(pwd)"/stam.json:/usr/src/app/configuration/pages.json`

## getting-started with Docker 

`docker build -t lighthouse:0.1 .` 

Export your variables to the environment

`docker run -e AUTH_USER -e AUTH_PASSWORD -e EMAIL_TO lighthouse:0.1` 

## Get your credentials here

Get your [PageSpeed API key](https://developers.google.com/speed/docs/insights/v4/first-app).

Read bout Google's [app passwords](https://support.google.com/accounts/answer/185833) to use Gmail.

| ![](https://user-images.githubusercontent.com/516342/74944673-0c848a00-53ff-11ea-888c-457f16bdb1b9.png)
| -
