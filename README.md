# iWarm 

<div style="text-align: center">
    <img width="300" alt="iWarm screen" src="https://user-images.githubusercontent.com/3057676/211567850-3e759c14-2e26-4901-97f1-70f396ab1421.png">
</div>

iWarm is a personal project for create a [SwarmApp](https://swarmapp.com/) kind of clone.


## Background History

When I plan to travel I use Notion Pages to organize the trip: adding location, hotel information, flight tickets and the **itinerary**.


<details>
<summary>Trips Notion Page template</summary>
    <img width="300" alt="image" src="https://user-images.githubusercontent.com/3057676/211588430-626eb970-dd80-42a8-b941-7b3117a7ab07.png">
</details>


In order to have a historical data about where I've been on those trips I always make usage of Swarm App to check in on places I visit.

But I'd like to link those information in a better way. This is the reason I've built the iWarm. 

## How it works

<img width="600" alt="image" src="https://user-images.githubusercontent.com/3057676/211589648-fcd19295-d32b-4ee8-8544-d2a4dfb6d31e.png">


- iWarm is a PWA installed in my phone.
- The search is powered by [Google Places API - SearchBox](https://developers.google.com/maps/documentation/javascript/examples/places-searchbox)
    - it uses browser's geolocation to bias the search
- Trough NextJS api endpoint, connects to Notion Databases to save and retrieve the check-ins made.
- It uses Notion Icon SVGs to render the categories on the homepage.


After connecting and saving data to Notion Database I can make linked views in my Travel's page filtering the places I've been :D 