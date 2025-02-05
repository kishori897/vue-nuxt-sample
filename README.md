## Setup

Make sure to install the dependencies:

```bash
yarn install
```

## Development Server

```bash
# yarn
yarn run dev
```

## Production

```bash
# yarn
yarn run build
```

## Tips and Tricks

```bash
# Get all ENVs
heroku config

# Get Single ENV
heroku config:get GITHUB_USERNAME

# Add new Env to heroku
heroku config:set GITHUB_USERNAME=joesmith

# Remove an ENV
heroku config:unset GITHUB_USERNAME

```
