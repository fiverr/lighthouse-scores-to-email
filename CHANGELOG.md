# 2.0.3

- Update pagespeedonline API URL

# 2.0.2

- Add request URL to error log
- Update to node 16

# 2.0.1

- Add request URL to error log
- Update to node 14

# latest
Version 2 is currently the latest version:
```bash
docker run fiverr/lighthouse-scores-to-email:latest
docker run fiverr/lighthouse-scores-to-email:2.0.0
```

# 2.0.0

## Breaking Changes
- Rename config environment variable `HOST` to `EMAIL_HOST`
- Rename config environment variable `PORT` to `EMAIL_PORT`

## New features
- Add statsd support: Send gauge metrics to statsd

# 1.0.0
To keep using version 1 use:
```bash
docker run fiverr/lighthouse-scores-to-email:1.0.0
```
