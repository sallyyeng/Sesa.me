# Tic Tac Toe with a Twist

> Tic tac toe game that is more than a game.  Click a pattern on the board to unlock a secret authenticated messaging interface.  The target audience is human trafficking and domestic violence victims, and the administrators who will interface with victims to get them help.

## Team

  - Anne Pruett
  - Amanda Bozigian
  - Michael Cooper
  - Rebecca Townsend

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Developer Instructions
> Follow instructions for starting the server, installing dependencies, and webpack bundling below.

## Tech Stack
- React
- Node
- Express
- mysql
- Sequelize

## Requirements

- Babel 6.23.0
- Babel-loader 7.1.2
- body parser 1.18.2
- bcrypt 1.0.3
- bcrypt-nodejs 0.0.3
- jquery 3.2.1
- Node 9.x.x
- npm 5.5.1
- Express 4.16.2
- Moment 2.19.2
- React 16.1.1
- React DOM 16.1.1
- React Bootstrap 0.31.5
- Sequelize 4.22.12
- mysql 2.15.0

## Development

- Babel CLI 6.7.5
- Babel Preset es2015 6.6.0
- Babel Preset React 6.24.1
- Babel Register 6.7.2
- Babel Jest 21.2.0
- Jest CLI 21.2.1
- Enzyme 3.2.0
- Jest 21.2.1
- React Test Renderer 16.1.1
- Webpack 3.8.1

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Starting the Server

```sh
npm run server-dev
```

### Webpack Bundling

```sh
npm run react-dev
```

### Testing

Please run your changes through npm test before submitting a PR. This is part of the deployment process, so PR's will fail if there are any errors.

```sh
npm test
```

Open [http://localhost:3000/](http://localhost:3000/) to see your app, refresh for changes.

### Known Issues

- If hotbutton is activated while form components are rendered, an uncaught error may be thrown. The unlocked forms function is not passed to the board component when the form component is rendered. To resolve error, need to handle case where form is already rendered and hotbutton has been activated.

### Roadmap

View the project roadmap [here](http://bit.ly/2zLjWhM)

### Preview

![Main View](https://i.imgur.com/jyyspMW.png)
![Sign Up](https://i.imgur.com/LkY9R0B.png)
![User Submit Message](https://i.imgur.com/kArSy6o.png)
![User View Correspondence](https://i.imgur.com/wMOVNHE.png?1)
![Admin Inbox](https://i.imgur.com/Hyt263z.png)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

