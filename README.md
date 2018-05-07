# SingWellWeb

## Summary

The web version of Choir Connect is meant for choir directors to be able to easily connect with their choirs. They do this by creating organizations, underneath these organizations is where their choirs live. Choirs then have events that the director creates. These events have programs which are constructed using the music from their music library. In order to effectively create an event, the organization must have the necessary music in their music library. From an associated music page the director can add resources like an MXL file which will allow the choir users on the mobile app side to practice the associated song. 

## Issues

* This code that this was written over the span of 9 months with two new React developers, so there are certainly hoops that we had to jump through where the solutions might not have been the best solution, but it was the solution that we came up with at the time. 

* We switched between two different React Material Design components. The first one we used was [React MDL](https://tleunen.github.io/react-mdl/).
	* The tabular format of the application was built off this package. I would suggest to begin by refactoring this tabular format the the Material components we are now using, as when you are working on this application the official verson 1.0 should be out. 

* The second Material components library we pulled from was [Material UI](https://www.material-ui.com/#/).
	* This should have had the official release out by now as it was slated for late Spring 2018, if it isn't then I would suggest still using the beta components from [Material UI Next](https://www.material-ui-next.com/#/), as the components for React MDL had tons of overhead and there are less components defined in that component library. 

* The calender view in the "Events" tab of the organization page is extremely hacky. The component that I pulled from [React Day Picker](http://react-day-picker.js.org/) is not the most ideal for displaying events. I suggest finding a better calender React component to display events to the user. 

* The Login and Register forms were created first and were created using entirely HTML/CSS/JS and a ton of JQuery, which is not ideal for a React application, I would suggest changing these to be in a similar vein as the other parts of the application.

* We never created a HTTP Request Service container, I suggest creating a folder which has a HTTP service that deals with all of the requests and responses, currently whenever a request needs to be made we have in the `ComponentWillMount()` function.
	* Also all of the requests are made using JQuery, I would suggest changing it to React's `fetch()`. 

* Currently you are able to attach any file type to a Music Page, but only PDFs, youtube links, and MXL files are displayed to the choir director. I suggest making it so that you can only upload files that are allowed, make sure you list that out to the user. 

* Right now you can only individually send one youtube link at a time, I suggest making it so that you can send multiples

* Announcements are ready on the back end, I would suggest setting those up by creating a modal on whatever page the director can send announcements. 

* Directors need the ability to add misc. links to a music piece as well. 

## Running the app

You can learn more about running the app in the actual application folder, React created an expansive readme that gives you all the knowledge about React in general, but basically its just `npm install` and then `npm start` in the project folder. 

