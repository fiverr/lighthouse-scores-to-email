# lighthouse-scores-to-email

## Configurations

Add email and general configurations to `/configuration/config.js`
Add pages configurations to `/configuration/pages.json`

To load configurations during run time from external file, use docker volume.
`-v "$(pwd)"/stam.json:/usr/src/app/configuration/pages.json`

## getting-started with Docker 

`docker build -t lighthouse:0.1 .` 

Export your variables to the environment

`docker run -e AUTH_USER -e AUTH_PASSWORD -e EMAIL_TO lighthouse:0.1` 

