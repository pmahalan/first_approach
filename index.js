//Instructions: 
//Create a command-line application that dynamically generates a PDF profile from a GitHub username. The application will be invoked with the following command:
//node index.js
//creating a comment so that I can commit, add and push to repo and test to make sure its working

const axios = require("axios");
const inquirer = require("inquirer");

//const electronHTMLto = require("electron-HTML-to")

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })

  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(result) {
         //the entire result is one object; githubinfo is us creating a new object.
        const githubinfo = {
        "avatar_url": result.data.avatar_url,
         "login": result.data.login,
         "html_url": result.data.html_url,
         "location": result.data.location,
         "blog": result.data.blog,
         "bio": result.data.bio,
         "repos_url": result.data.repos_url,
         "followers": result.data.followers,
         "starred_url": result.data.starred_url,
         "following": result.data.following
        }

        const generateHTML = require("./greenHTML");
        //the above line WAS at the top of the document; I moved it because i thought there might be an error with scope otherwise.
        //But I still get the same error messages as before!!!

        generateHTML(githubinfo)
        //console.log(githubinfo)

  });

})