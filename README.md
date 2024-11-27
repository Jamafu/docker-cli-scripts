# Docker Convenience Scripts

This repository contains a collection of CLI scripts that enhance the developer experience when working with the Docker CLI. These scripts utilize [enquirer](https://github.com/enquirer/enquirer) to provide a user-friendly interface in the terminal.

## Available scripts

### Start Docker containers

This script looks for a `docker-compose` file within the current directory and provides the user with a list of potential services to start. The user can then select the services to start.

### Stop Docker containers

The script provides the user with a list of running docker containers. The user can then select the containers to stop.

### Get logs of Docker containers

The script provides the user with a list of running docker containers. The user can then select the containers to get the logs from.

## Installation & Build

1. Clone this repository
2. Install the dependencies: `npm install`
3. Build the scripts: `npm run build`

## Add scripts to dotfiles

It is recommended to add the scripts to your dotfiles so they are available globally. How you do it depends on your local setup. Here is an example of
how to add the scripts to your `~/.functions` file. Note that you have to replace `<path-to-repository>` with the actual
path to the repository.

```bash
function dks() {
  # docker kill selected
  node <path-to-repository>/_dist/executables/stopDockerServices.js
  return
}

function dss() {
  # docker start selected
  node <path-to-repository>/_dist/executables/startDockerServices.js
  return
}

function dl() {
  # docker log selected
  node <path-to-repository>/_dist/executables/startDockerLogs.js
  return
}
```

After adding the functions to your dotfiles, you must restart your terminal.

## Usage
After adding the functions to your dotfiles, you can use the following commands in your terminal:  
`dks`: Stop selection of Docker containers  
`dss`: Start selection of Docker containers  
`dl`: Get logs of specific Docker container