# Atrijum Atelje

  <div align="center" style="display: flex">
    <p>
      <a href="http://angular.io/" target="blank">
        <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="200" alt="Nest Logo" />
      </a>
    </p>
    <p>
      <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
    </p>
  </div>

- [Installation](#installation)
- [Usage](#usage)
  - [Running application](#running-application)

## Installation

This project utilizes power of Docker and Docker Compose to create and manage all parts of the Atrijum environment including all external services as databases.

Requirements:

- Docker 20 or greater (_[why?](https://www.docker.com/why-docker/)_)
  - [Get it for macOS](https://docs.docker.com/docker-for-mac/install/)
  - [Get it for Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntu/)
  - [Get it for Fedora](https://docs.docker.com/engine/installation/linux/fedora/)
  - [Get it for Windows](https://docs.docker.com/docker-for-windows/install/)
- Docker Compose
  - Docker for Mac, Docker for Windows, and Docker Toolbox include Docker Compose
  - [Get it for other platforms](https://github.com/docker/compose/releases)
- If you're running some sort of the Linux, check [additional linux requirements](#additional-linux-requirements)
- If you're running Windows, check [additional windows requirements](#additional-windows-requirements)

## Usage

**It's really simple!**

- Clone this repository

  ```sh
  git clone git@github.com:dragomir-urdov/atrijum.git & cd atrijum
  ```

- Create and populate environment files used by docker compose services by using provided '.example' files

  - This script will copy the example files as stubbed env files.
  - EDIT NEWLY CREATED FILES, PAY ATTENTION TO THE COMMENTS.
  - Replace TODO and 'xxx' values with real ones.

  ```sh
  pnpm dev:init
  ```

- Run container

  ```sh
  # all services
  docker-compose up
  ```

  ```sh
  # min services to do basic app functions
  docker-compose up -d atelje
  ```

  Initial run will cause download of all docker images, so be patient it shouldn't take some time.

### Running application

By default each service has initial start command which will be run every tine when container is created. For most applications it will install dependencies, and start the server. So when you create container each application is properly initialized and it's listening for incoming connections. You can access applications at the following addresses:

- [client](https://github.com/dragomir-urdov/atrijum/tree/main/services/atelje/atelje-client) - Atrijum atelje Client
  - UI - **[http://localhost:4200/](http://localhost:4200/)**
  - TESTS - **[http://localhost:9876/](http://localhost:9876/)**
- [server](https://github.com/dragomir-urdov/atrijum/tree/main/services/atelje/atelje-server) - Atrijum Atelje Server
  - API - **[http://localhost:3000/api](http://localhost:3000/api)**
- mongo - Mongo instance
  - DB - **[http://localhost:27017/](http://localhost:27017/)**
