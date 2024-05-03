# Toby's React Weather App

### Milestone 2 Assignment for RevoU FSSE Amsterdam

#### By Tobias Agyasta (Team 2)

[Live Netlify Link](https://tobys-weather-app.netlify.app/)

## Dependencies

- This project was made with [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- This project uses [npm](https://www.npmjs.com/) to manage libraries, packages, and modules.
- This project fully uses [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) for its css styles.
- This project uses [react-router](https://reactrouter.com/en/main) to route between different pages.
- This project uses [OpenWeatherAPI](https://openweathermap.org/api) for fetching the weather information.
- This project uses [Open Cage API](https://opencagedata.com/api) for fetching the location data.
- This project uses [Mapbox Static Map API](https://docs.mapbox.com/api/maps/static-images/) for fetching static map images.
- This project uses [weather-icons](https://erikflowers.github.io/weather-icons/) for its weather icons.
- This project uses [react-spring](https://www.react-spring.dev/) for its animations and for generating gradient colors and transitions.
- This project uses [moment-timezone](https://momentjs.com/timezone/) for fetching date and time data on different timezones and countries.
- This project uses [country-flag-emoji-polyfill](https://github.com/talkjs/country-flag-emoji-polyfill) for displaying country flag by emojis in non-Macintosh / IOS based browsers.

## How to Open

Using git, you can clone and open the repository using the following command in git bash on your preferred local folder:

```console
git clone https://github.com/RevoU-FSSE-4/milestone-2-tobiasagyasta.git

cd milestone-2-tobiasagyasta
```

Then, you can start the **development version** of the application by running

```console
npm start
```

Or, you can run the **build version** by using npm and [serve](https://www.npmjs.com/package/serve) by running

```console
npm run build

serve -s build
```

Otherwise, you can open the build version directly from the Netlify deployment on the top of this page.

## About

![App Screenshot](src/data/weather%20app.PNG)

This is a Weather app that shows data on your current location and other major cities in the world using Open Weather API and Open Cage API.

The application has the following features:

1. Fetching user's location and displaying its weather data.
2. Search bar with autosuggestions for country and major cities for each country.
3. Dynamic icons that provides quick understanding of the weather conditions.
4. Dynamic backgrounds based on weather condition in each location
5. Local map image of the location.
