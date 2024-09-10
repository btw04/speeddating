## Overview
This website is intented for helping students connect and share their information among each other. 
It was developed for the Workshop "Lerngruppen Speeddating" (OPhase Informatik TU Darmstadt).

## Deployment

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- Environment entry containing the *Docker Connection URI* as ``MONG_URI``. The easiest way to create this locally for the application is creating a ``.env`` file in the same directory containing the line ``MONGO_URI=<MONGO_URI>``. 

### Build Image
Clone this repository and run ``docker build ./ -t "Speeddating"`` in the same directory. Note that docker build might take different path-arguments (pointing to the Dockerfile) on some machines (especially not needing ./ as an argument).

### Running the Image
After successfully building the image, run ``docker run -p 3000:3000``. This will map the internal container port of 3000 to the machine port 3000. Change the external (machine) port if necessary.


## License
This project is licensed under the MIT License