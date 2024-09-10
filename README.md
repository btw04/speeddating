## Overview

This website is intended to help students connect and share their contact information. It was developed for the workshop "Lerngruppen Speeddating" (OPhase Informatik TU Darmstadt).

## Deployment

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- Environment variables containing the Docker Connection URI as `MONGO_URI`, the exposed website port as `EXTERNAL_PORT`, the exposed MongoDB port as `MONGO_PORT` and `MONGO_USER` + `MONGO_PASS` for the MongoDB user and password. These must match the used credentials in the `MONGO_URI`. The easiest way to set this up locally is to create a `.env` file in the same directory that looks like this:
```
EXTERNAL_PORT=8081
MONGO_URI = mongodb://abc:abc123@mongodb:27017/
MONGO_PORT=27017
MONGO_USER=abc
MONGO_PASS=abc123
```


### Run containers

Clone this repository and run `docker compose up` in the directory, optionally detached as `docker compose up -d`

## ToDo
- [ ] Stronger wording for data deletion
- [ ] Option to delete specific added tags ("friends")
- [ ] Check for tag-conflict on creation
- [ ] Prevent users from changing ID (separate session token)
- [ ] Fix time-notice (server-side timestamp? delete feature?)
- [ ] Script for distributing added friends

## License

This project is licensed under the MIT License.
