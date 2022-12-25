# movies-explorer-api

Diploma backend project at Yandex.practicum. 

## What is done?
* user handling via cookies
* stores favorite films for the user

## Routes
* /users
  * GET /me - returns current user info
  * PATCH /me - update current user info (email and name) 
* /movies
  * GET / - returns a movies list for currents user
  * POST / - adds a movie to library
  * DELETE /:id - deletes a movie record by id for current user
* Authentification routes
  * POST /signin - logs in user and sets cookie
  * GET /signout - logs out user and clears cookie
  * POST /signup - creates new user (name, email, password)

## Base data structure
* User {name, email, [password]}
* Movie {country,director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN, [owner]}

## Tech stack
* Node.js
* ExpressJS
* MongoDB

## Scripts
* npm run start - starts backend server
* npm run dev - starts backend server with hot reload
* npm run lint . - starts eslint validation

## Links
* public URL:
