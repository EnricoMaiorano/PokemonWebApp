# PokemonWebApp

#### By _**Enrico Maiorano**_

#### _WebApp for managing Pokémon teams._

## Description

This project is a web app, which allows you to create and manage teams composed of Pokémon. You can create your own pokemon teams and give them a name, and later you can view all created teams with their properties.
When you create a team you can see the properties of every single pokemon that is added. Each team can own 6 pokemon.

## Technologies used

* Node.js
* JavaScript
* jQuery
* Pug
* Html, css
* Express
* Docker

## Requirements

* Node.js
* Docker desktop

## How to Run

* _Clone the repository to your desktop_
*  _Open CMD_ 
*  _Navigate to the top level of the directory_
*  To start the docker container and the app, run the following

```bash
docker compose up
```

## Routes

  http://localhost:3000/                      # Home </br>
  http://localhost:3000/team/create           # Page create team </br>
  http://localhost:3000/team/list             # Team listing page </br>
  http://localhost:3000/team/*/edit           # Team edit page  _*the name of the team_ </br>

## Files & directories
    
    .
    ├── public                   
    │   ├── images              # Images file     
    │   ├── javascripts         # Javascripts file
    │   ├── stylesheets         # Style file
    ├── routes                  # Javascripts files which contain the routes of website
    ├── views                   # Pug files which contain the HTML templates  
    


## The Web site
