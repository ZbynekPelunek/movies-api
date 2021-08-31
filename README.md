# Movies API

This is a demo API for Movies. Documentation will be added later using Insomnia. These endpoints will be available:

> - **GET** *"/movies"*
>   - Returns all movies.
> - **POST** *"/movies"*
>   - Adds new movie to the database.
> - **PUT** *"/movies/{movieId}"*
>   - Updates existing movie with provided values.
> - **DELETE** *"/movies/{movieId}"*
>   - Deletes a movie.
> - **GET** *"/movies/{movieId}"*
>   - Retrieves specific movie.

## Table of contents

- [Installation](#installation)
- [Technologies](#technologies)
- [NPM Libraries](#npm-libraries)
- [To-do list](#to-do-list)
- [Status](#status)

## Installation

Initialize git in your folder of choise with

```bash
git init
```

Then clone this repository

```bash
git clone https://github.com/zbynekpelunek/movies-api
```

Install all need node module

```bash
npm i
```

Add *.env* file and copy paste the *.env_example* variables there. Change the values using your credentials.

Finally, start the server

```bash
node server.js
```

Using Postman or similar software, you can now access Movies API on localhost

```bash
localhost:4001/movies
```

### Technologies

- Javascript

### NPM Libraries

- Express.JS
- Morgan
- Sequelize
- dotenv

### To-do list

- Bulk create
- Docker
- API documentation
- logger

### Status

 Task is: _incomplete_
