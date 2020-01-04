//Instructions: 
//Create a command-line application that dynamically generates a PDF profile from a GitHub username. The application will be invoked with the following command:
//node index.js
//creating a comment so that I can commit, add and push to repo and test to make sure its working

const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const convertFactory = require("electron-html-to");
const path = require("path");

let dataObj = {
  color: "",
  stars: 0,
  info: ""
}

inquirer
  .prompt([
    {
    type: 'input',
    message: "Enter your GitHub username",
    name: "username"
  },
  {
    type: 'list',
    name: 'color',
    message: 'Which of these four colors do you like best?',
    choices: ['green', 'blue', 'pink', 'red']
  }
  ])
  

  .then(function({ username, color }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    const queryStarsUrl = `https://api.github.com/users/${username}/repos`;

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
         "following": result.data.following,
         "username": username,
         "color": color,
          "stars": 0
        }

        const generateHTML = require("./greenHTML.js");
        //the above line WAS at the top of the document; I moved it because i thought there might be an error with scope otherwise.
        //But I still get the same error messages as before!!!

        const finalHTML = generateHTML(githubinfo);
        //console.log(githubinfo)

        fs.writeFile("Generated.html",

        finalHTML, 

        function(err) {
          if (err) {
            throw err;
          }
          console.log("success")
        })
//fs.writeFile above has three params: the path of the file I'm creating,
//the string (represented by finalHTML), and the callback function.

var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});
 
conversion({ html: finalHTML }, function(err, result) {
  if (err) {
    return console.error(err);
  }
 
  console.log(result.numberOfPages);
  console.log(result.logs);
  result.stream.pipe(fs.createWriteStream(path.join(__dirname, 'omgitworked.pdf')));
  conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
});


  });

})