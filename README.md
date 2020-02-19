# lighthouse-scores-to-email

## Configurations

Add the pages and email configurations to /configurations/config.js 

## getting-started with Docker 

`docker build -t lighthouse:0.1 .` 

Export your variables to the environment

`docker run -e AUTH_USER -e AUTH_PASSWORD -e EMAIL_TO lighthouse:0.1` 

