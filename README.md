# README

Creates simple wiki-looking website from Google Docs documents published as HTML.

### Requirements

* (yarn)[!https://yarnpkg.com/lang/en/docs/install/#mac-stable] npm, but better and simpler

### Setup

Install node dependencies
```
yarn install
```

Rename `config/docdata.json.example` to `config/docdata.json` and fill in the content according to the example.

Rename `.env.example` to `.env` and add the FTP connection data. This is required for command line deployment.

### Development

Start the project locally
```
yarn start
```

### Deployment

```
yarn deploy
```