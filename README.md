## Overview

This website is intended to help students connect and share their contact information. It was developed for the workshop "Lerngruppen Speeddating" (OPhase Informatik TU Darmstadt).

## Deployment

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- A couple of environment variables for setup:

| **Environment Variable** | **Description**                                                               | **Required** | **Recommended Value**                        |
|--------------------------|-------------------------------------------------------------------------------|--------------|----------------------------------------------|
| `MONGO_URI`              | The connection URI for MongoDB, containing the user and password              | YES          | mongodb://\<user\>:\<password\>@localhost:27017/ |
| `MONGO_USER`             | MongoDB username, must match the value in `MONGO_URI`                         | YES          |                                              |
| `MONGO_PASS`             | MongoDB password, must match the value in `MONGO_URI`                         | YES          |                                              |
| `MONGO_PORT`             | The exposed port for MongoDB                                                  | YES          | 27017 (mongo default)                        |
| `EXTERNAL_PORT`          | The exposed port for the website                                              | YES          | 8080 (needs to be open!)                     |
| `SUBDOMAIN`              | Subpath to run the website on (experimental)                                  | NO           |                                              |
| `NUMBER_OF_QUESTIONS`    | Number of "ice breaker" questions displayed for users                         | NO           | 3-5                                          |
| `TIME_TO_SWITCH`         | Time in minutes after which users are notified to switch conversation partner | NO           | 3-5                                          |
| `MINIMUM_FIRST_TIME`     | Minimum time in minutes before users are notified to switch conversation      | NO           | 10                                           |


The easiest way to set this up locally is to create a `.env` file in the same directory that looks like this:
```
# required
EXTERNAL_PORT=8081
MONGO_URI = mongodb://<USER>:<PASSWORD>@mongodb:27017/
MONGO_PORT=27017
MONGO_USER=<USER>
MONGO_PASS=<PASSWORD>
# optional
NUMBER_OF_QUESTIONS=4
MINIMUM_FIRST_TIME=5
TIME_TO_SWITCH=10
```


### Run containers

Clone this repository and run `docker compose up` in the directory, optionally detached as `docker compose up -d`

### Sending Mails

After running the event, sending mails to the participants is handled with the python scripts provided in `/scripts`. These need a JSON dump of the MongoDB data. This can be obtained by using `mongoexport` in combination with `docker exec`. We used `docker exec -it speeddating_mongodb mongoexport --uri "mongodb://<user>:<password>@mongodb:27017?authSource=admin" --db speeddating --collection users >> speeddating.json` but this depends on container naming and especially MongoDB version. This data might need some processing before it is accepted by the script. We needed to remove the first/last lines and add commas after very database entry, wrapping them in an array. 


## Known Limitations

**Running this website on a subpath does not currently work!**

The MongoDB Container caches the database user in its Docker volume and changing the USER/PASSWORD after initializing it will not be applied on restart. Instead, only deleting the MongoDB volume and reinitializing it will set the new User. *Note that this will also delete all data stored in the database!* One way to achieve this is by running `docker compose down -v` while the containers are running.

The MongoDB version used requires a specific CPU function that older processors might not support. Downgrading to MongoDB v4 fixes this, simply swap the installed MongoDB image to `mongo:4`.

Receiving the "switch your partner" notification requires the participants to always keep a look at their smartphone and having it turned on in the first place. This results in it being missed most of the time. Consider switching to a different system, like announcing the switch using a megaphone.

Some wording and design implies that the e-mails/messages will be send immediately, resulting in some questions from participants. This is not the case, as the python scripts handles the sending of mails afterwards and needs to me run manually.

## License

This project is licensed under the MIT License.
