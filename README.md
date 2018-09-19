# JustYourAverageChat

*JustYourAverageChat is just as the title explains it is just another average chat. It allows a user to log into the system and create an account. From there the user is brought to the main chat screen where they can interact with others and even express themselves with gifs. *

Live Site: https://justyouraveragechat.herokuapp.com/chat

Along with being a MERN stack application, this application utilizes the following technology:
- [x] Socket.io https://socket.io/docs/client-api/
- [x] GIPHY API https://developers.giphy.com/docs/
- [x] Pexels API https://www.pexels.com/api/new/
- [x] Google oAuth with Passport.js http://www.passportjs.org/


#### How To Set Up Locally

1. Clone the repository to a local directory using ```git clone https://github.com/PixelPerfectDev/JustYourAverageChat.git```
2. Cd into the correct directory and run ```yarn run packages```. This will install both the server and client dependencies.
3. Now you will need to make your config file. To do this you will need to go to four sites.
    1. Google (https://console.cloud.google.com/apis/dashboard):
        * Google is by far the hardest to set up although it shouldn't be too bad.
        * You will need to create a project and wait for it to finish the set up process in google.
        * Then you will need to enable the Google+ Domains API.
        * For the credentials you will need to set up the following things:
            1. Authorized JavaScript origins: http://localhost:3000
            2. Authorized Redirect URLs: http://localhost:3000/auth/google/callback
            3. OAuth Consent Screen Product Name: JustYourAverageChat
    2. Giphy (https://developers.giphy.com/):
        * Create an account
        * Create an app
        * Name the application JustYourAverageApp
        * Wait for the API Key.
    3. Pexels (https://www.pexels.com/api/new/):
        * Create an account
        * Request and API Key
    4. mLab (https://mlab.com/welcome/):
        * Create and account or sign in
        * Create a new MongoDB Deployment
        * Create a user with a unsername and password
        * Get the complete URI from your mLab instance.
    5. Structuring the config file.
        * In the config folder in the main repo create a dev.js file.
        * The file should look like the following:
        
        ```module.exports = {
            googleClientID: '{YOUR GOOGLE CLIENT ID}',
            googleClientSecret: '{YOUR GOOGLE CLIENT SECRET}',
            mongoURI: '{YOUR MLAB URI}',
            cookieKey: '{CREATE A STRING THAT WONT EASILY BE REPLECATED}',
            giphyKey: '{YOUR GIPHY KEY}',
            pexelsKey: '{YOUR PEXELS KEY}'
        };```
        
4. Now that the setup is complete run ```yarn run dev``` to start the application on your local computer. 



