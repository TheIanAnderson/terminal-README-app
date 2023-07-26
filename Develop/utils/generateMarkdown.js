const inquirer = require("inquirer");
const fs = require("fs");
const todos = {
  description: "# Description",
  tableOfContents: `## Table of Contents
  • [Description](#description)
  • [Installation](#installation)
  • [Usage](#usage)
  • [License](#license)
  • [Contributing](#contributing)
  • [Tests](#tests)
  • [Questions](#questions)`,
  installation: "# Installation",
  usage: "# Usage",
  license: "# License",
  contributing: "# Contributing",
  tests: "# Tests",
  questions: "# Questions",
};

const question = {
  title: "What will your markdown file be titled?",
  description: "What is the description of your project?",
  installation: "What are the installation instructions?",
  lisence: "What lisence would you like to use?",
  usage: "How will your app be used?",
  contributing:
    "How would you like people to handle contributions to this project?",
  tests: "How can people run tests for this project?",
  github: "Enter your github username:",
  email: "Enter your email:",
};

function populateMarkdownFile(data, fileName) {
  let lisence = data.lisence;
  let description = data.description;
  let installation = data.installation;
  let fileStructure = `
  *The ${lisence} lisence is in use on this project.*
  ${todos.description}
  ${description}
  ${todos.tableOfContents}
  ${todos.installation}
  ${installation}
  ${todos.usage}
  ${data.usage}
  ${todos.contributing}
  ${data.contributing}
  ${todos.tests}
  ${data.tests}
  ${todos.questions}
  **To inquire about anything regarding this project reach out to my github with this username: ${data.github}, otherwise you can email me at ${data.email}**`;
  fs.appendFile(fileName, fileStructure, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function initializeInquirer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: question.title,
        name: "title",
      },
      {
        type: "input",
        message: question.description,
        name: "description",
      },
      {
        type: "input",
        message: question.installation,
        name: "installation",
      },
      {
        type: "input",
        message: question.usage,
        name: "usage",
      },
      {
        type: "input",
        message: question.contributing,
        name: "contributing",
      },
      {
        type: "list",
        message: question.lisence,
        name: "lisence",
        choices: ["MIT", "ISC"],
      },
      {
        type: "input",
        message: question.tests,
        name: "tests",
      },
      {
        type: "input",
        message: question.github,
        name: "github",
      },
      {
        type: "input",
        message: question.email,
        name: "email",
      },
    ])
    .then((data) => {
      const fileName = `${data.title.toLowerCase().split("  ").join("")}.md`;
      const unquoted = fileName.replace(/"([^"]+)":/g, "$1:");

      fs.writeFile(unquoted, "", (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          populateMarkdownFile(data, fileName);
        }
      });
      console.log("File created successfully.");
    });
}

module.exports = initializeInquirer;
