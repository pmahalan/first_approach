//Instructions: 
//Create a command-line application that dynamically generates a PDF profile from a GitHub username. The application will be invoked with the following command:
//node index.js
//creating a comment so that I can commit, add and push to repo and test to make sure its working

const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./greenHTML.js");


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

        generateHTML(githubinfo.)
        //console.log(githubinfo)

  });
  

})