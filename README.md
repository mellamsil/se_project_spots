# Project 9: Spots Website with API COnnectivity

This is an image sharing site.

## Project Description

The se-project-spots started from the third project of the Software Engineering program at TripleTen. The main idea of the project is to create a responsive site which responds to the user's behavior based on screen size, platform and orientation.

In project 9, I connected the Spots website to a database via an API, enabling user changes to persist when the page reloads. I implemented API requestes and handled responses to create a seamless user experience.

## Project Functionality

The following are the functionalities of the Spots website:

1. User Profile Management:

- View and edit user profile information
- Update profile picture

2. Card Management:

- View and load initial cards from the server
- Add new cards
- Delete existing cards
- Like and unlike cards

3. Data Persistence:

- changes made to user profile and cards are saved to the server
- Data is retrieved from the server and displayed on the page

4. Error Handling and Logging:

- Handling of errors and exceptions
- Logging of errors and debugging and troubleshooting purposes

5. Improved User Experience (UX):

- Display of loading indicators for asynchronous operations
- Notification of successful or failed operations

## Technologies and Techniques Used

- Semantic HTML5
- CSS
- Figma
- Responsive Design
- Javascript modules
- Webpack
- API requests (GET, POST, PATCH, DELETE)
- Error handling and logging

## Project Featues

. User profile information fetched from the server and displayed on the page
. Initial cards loaded from the server and displayed on the page
. Ability to edit user profile information and save changes to the server
. Ability to add new cards and save them to the server
. Ability to delete cards and remove them from the server
. Ability to like and unlike cards
. Ability to undate the user's profile picture
. Improved UX with loading indicators and error handling

**Video**

- [Link to the project video] https://drive.google.com/file/d/1Ty8xNfVv5seqQ0U6N0FTEU3YeFMDd6ku/view?usp=sharing

## Deployed Project

View the deployed project on GitHub Pages

- Deployment Link:https://github.com/mellamsil/se_project_spots/pull/2

## API Endpoints

- GET/users/me
- PATCH/users/me
- PATCH/users/me/avatar
- GET/cards
- POST/cards
- DELETE/cards/:cardId
- PUT/cards/:cardId/likes
- DELETE/cards/:cardId/likes
