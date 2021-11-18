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
*  _To start the docker container and the app, run the following_

```bash
docker compose up
```
***_The deffault port is 3000, you can change this port in docker-compose.yml file._

## Routes

  Home page: http://localhost:3000/</br>
  Page create team: http://localhost:3000/team/create</br>
  Team listing page: http://localhost:3000/team/list</br>
  Team edit page: http://localhost:3000/team/*/edit &nbsp;_*the name of the team_ </br>

## Files & directories

    .
    ├── public                   
    │   ├── images              # Images file     
    │   ├── javascripts         # Javascripts file
    │   ├── stylesheets         # Style file
    ├── routes                  # Javascripts files which contain the routes of website
    ├── views                   # Pug files which contain the HTML templates  


## The Web Site

### The Home page http://localhost:3000/
Contain two button to get in create team page and teams listing page.

![Home](https://user-images.githubusercontent.com/84178914/142489528-ccbf8410-835d-433a-a22d-5c7b1878d322.png)

### The Create team page  http://localhost:3000/team/create   
In this page you can chose the name of your team and add the pokemon by clicking the button "Gotta Catch 'Em All".
6 pokemon will add in your team.

![Create_your_team2](https://user-images.githubusercontent.com/84178914/142490178-43fe4c12-c02c-434f-a49d-9450bc3f31d8.png)

### The Team listing page http://localhost:3000/team/list   

In this page you can see all teams you have created, furthermore you can filtrer the teams by the types with the appropriate filter buttons.

![Team_listing2](https://user-images.githubusercontent.com/84178914/142490689-c1c4549b-1683-4eb6-87b0-e3d7a634e7fb.png)

### The edit page http://localhost:3000/team/*/edit &nbsp;*the name of the team

In this page you can modify the name of the team or delete.

![Edit](https://user-images.githubusercontent.com/84178914/142491266-d1dddad4-1ffd-494a-9015-649864850cf2.png)
