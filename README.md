## Overview

This website is intended to help students connect and share their contact information. It was developed for the workshop "Lerngruppen Speeddating" (OPhase Informatik TU Darmstadt).

## Deployment

### Prerequisites
- [Docker](https://www.docker.com/get-started)

Environment variables containing the Docker Connection URI as `MONGO_URI`, the exposed website port as `EXTERNAL_PORT`, the exposed MongoDB port as `MONGO_PORT` and `MONGO_USER` + `MONGO_PASS` for the MongoDB user and password. These **must match** the used credentials in the `MONGO_URI`. 
Optional parameters are `SUBDOMAIN` if running the website as a subdomain, `NUMBER_OF_QUESTIONS` for the number of "ice breaker" questions displayed for users, `TIME_TO_SWITCH` (in minutes) for the time after which users are notified to switch their conversation partners and `MINIMUM_FIRST_TIME` (in minutes) for the minimum time required before users are notified to switch their conversation. Note that these reminders are synchronized, so if a user logs in with MINIMUM_FIRST_TIME remaining until the next switch, they will only get notified after the remaining time + the next TIME_TO_SWITCH cycle. This might result in some users getting notified at a certain time while others are only notified on the next "cycle". For this reason, it is recommended to keep the MINIMUM_FIRST_TIME at a low value.

The easiest way to set this up locally is to create a `.env` file in the same directory that looks like this:
```
# required
EXTERNAL_PORT=8081
MONGO_URI = mongodb://<USER>:<PASSWORD>@mongodb:27017/
MONGO_PORT=27017
MONGO_USER=<USER>
MONGO_PASS=<PASSWORD>
# optional
SUBDOMAIN=/speeddating
NUMBER_OF_QUESTIONS=4
MINIMUM_FIRST_TIME=5
TIME_TO_SWITCH=10
```


### Run containers

Clone this repository and run `docker compose up` in the directory, optionally detached as `docker compose up -d`

## Known Limitations
The MongoDB Container caches the database user in its Docker volume and changing the USER/PASSWORD after initializing it will not be applied on restart. Instead, only deleting the MongoDB volume and reinitializing it will set the new User. *Note that this will also delete all data stored in the database!* One way to achieve this is by running `docker compose down -v` while the containers are running
## ToDo
- [X] Stronger wording for data deletion
- [X] Option to delete specific added tags ("friends")
- [X] Check for id-conflict on creation
- [X] Prevent users from changing ID (separate session token)
- [X] Fix time-notice (server-side timestamp? delete feature?)
- [ ] Script for distributing added friends

## License

This project is licensed under the MIT License.
