## Overview

This website is intended to help students connect and share their information with each other. It was developed for the workshop "Lerngruppen Speeddating" (OPhase Informatik TU Darmstadt).

## Deployment

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- An environment variable containing the *Docker Connection URI* as `MONGO_URI`. The easiest way to set this up locally is to create a `.env` file in the same directory with the line `MONGO_URI=<MONGO_URI>`.

### Build Image

Clone this repository and run `docker build ./ -t "speeddating"` in the same directory. Note that the `docker build` command might require different path arguments (pointing to the Dockerfile) on some machines, and you may not need `./` as an argument.

### Running the Image

After successfully building the image, run `docker run -p 3000:3000 speeddating`. This will map the internal container port 3000 to port 3000 on your machine. Change the external (machine) port if necessary.

## License

This project is licensed under the MIT License.
